/**
 * Created by antoine on 17/01/2017.
 */
import * as $ from 'jquery'

import { Book, TableConfig, Filter } from './types'
import { renderFilters, renderTable } from './TableRenderer'
import BookStore from './BookStore'

const Table = (userConfig: TableConfig) => {
    // Apply provided config to default config
    const config = Object.assign({
        sort: {
            field: 'title',
            direction: 'asc'
        },
        filters: [{
            key: 'genre',
            value: 'Romance',
            include: true
        },{
            key: 'genre',
            value: 'Computer',
            include: true
        },{
            key: 'genre',
            value: 'Science Fiction',
            include: true
        },{
            key: 'genre',
            value: 'Fantasy',
            include: true
        },{
            key: 'genre',
            value: 'Horror',
            include: true
        }]
    }, userConfig)

    // Create BookStore
    const store = BookStore(config)
    
    return {
        updateBooks: (newBooks:Book[]) => {
            store.setBooks(newBooks)
        },
        filterChanged: (event: any) => {
            // Parsing HTML event
            const changedFilter = {
                key: $(event.target).data('key'),
                value: $(event.target).attr('id'),
                include: $(event.target).prop('checked')
            }

            // Updating filters in config
            config.filters.forEach((filterFromConfig: Filter) => {
                if(filterFromConfig.key === changedFilter.key && filterFromConfig.value === changedFilter.value){
                    filterFromConfig.include = changedFilter.include
                }
            })

            // pushing config updates to store
            store.updateConfig(config)
        },
        sortOnColumn: (columnKey: string) => {
            // Mutable variable for sort direction
            let newSortDirection: 'asc' | 'desc' = 'asc'

            // Inverting current sort direction
            if(columnKey === config.sort.field && config.sort.direction === 'asc'){
                newSortDirection = 'desc'
            }

            // Updating sort data in config
            config.sort = {
                field: columnKey,
                direction: newSortDirection
            }

            // pushing config updates to store
            store.updateConfig(config)
        },
        render: () => $('<div></div>').append(renderFilters(config), renderTable(store.getBooks(), config))
    }
}

export default Table