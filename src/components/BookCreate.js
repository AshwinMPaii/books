import { useState } from 'react';
import useBooksContext from '../hooks/use-books-context';

export default function BookCreate() {
    const [title, setTitle] = useState('');
    const { createBook } = useBooksContext();
    const onFormSubmit = (event) => {
        event.preventDefault();
        createBook(title);
        setTitle('');
    }
    const handleChange = (event) => {
        setTitle(event.target.value);
    }
    return (
        <div className='book-create'>
            <h3>Add a Book</h3>
            <form onSubmit={onFormSubmit}>
                <label>Title:</label>
                <input className='input' value={title} onChange={handleChange} />
                <button className='button'>Create</button>
            </form>
        </div>
    )
}
