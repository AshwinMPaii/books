import { createContext, useCallback, useState } from "react";
import axios from 'axios';

const BooksContext = createContext();
function Provider({ children }) {
    const [books, setBooks] = useState([]);

    const fetchBooks = useCallback(async () => {
        const response = await axios.get("http://localhost:3001/books");
        setBooks(response.data);
    }, []);
    // const stableFetchBooks = useCallback(
    //     fetchBooks,
    //     []
    // )
    const editBookById = async (indexToEdit, newTitle) => {
        const response = await axios.put(`http://localhost:3001/books/${indexToEdit}`,
            {
                title: newTitle,
            })
        const updatedBooks = books.map((book) => {
            if (book.id === indexToEdit) {
                return { ...book, ...response.data };
            }
            return book;
        })
        setBooks(updatedBooks);
    };

    const deleteBookById = async (indexToRemove) => {
        await axios.delete(`http://localhost:3001/books/${indexToRemove}`)
        const updatedBooks = books.filter((book) => {
            return book.id !== indexToRemove;
        });
        setBooks(updatedBooks);
    }
    const createBook = async (title) => {
        const response = await axios.post("http://localhost:3001/books", {
            title,
        });
        const updatedBooks = [
            ...books,
            response.data];
        setBooks(updatedBooks);
    }
    const valueToShare = {
        books,
        createBook,
        deleteBookById,
        editBookById,
        fetchBooks
    }
    return (
        <BooksContext.Provider value={valueToShare}>
            {children}
        </BooksContext.Provider>
    )
}

export { Provider };
export default BooksContext;