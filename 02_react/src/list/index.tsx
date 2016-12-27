/**
 * Created by antoine on 24/12/2016.
 */
import * as React from 'react'

const styles = require('./styles.scss')

interface Book{
    id: string
    title: string
    author: string
    publish_date: string
    price: number
}

interface Props{
    books: Book[]
}

const List = ({books}: Props) => <div>
    <table className={styles.bookTable}>
        <thead>
        <tr>
            <th>Titre</th>
            <th>Auteur</th>
            <th>Publication</th>
            <th>Prix</th>
        </tr>
        </thead>
        <tbody>
        {books.map(book => <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.publish_date}</td>
            <td>{book.price}</td>
        </tr>)}
        </tbody>
    </table>
</div>

export default List
