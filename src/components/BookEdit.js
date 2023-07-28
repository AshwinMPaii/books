import { useState } from 'react'
import useBooksContext from '../hooks/use-books-context';

function BookEdit({ book, onSubmit }) {
    const [title, setTitle] = useState(book.title);
    const { editBookById } = useBooksContext();
    const handleChange = (event) => {
        setTitle(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        //onEdit(book.id, title);
        onSubmit();
        editBookById(book.id, title)
    }

    return (
        <form className='book-edit' onSubmit={handleSubmit}>
            <label>Title:</label>
            <input className='input' value={title} onChange={handleChange} />
            <button className='button is-primary' >save</button>
        </form>
    )
}

export default BookEdit