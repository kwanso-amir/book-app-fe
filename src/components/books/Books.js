import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, deleteBook } from "../../redux";

function Books() {
  const books = useSelector((state) => state.book.books);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, []);

  const handleDelete = (book) => {
    dispatch(deleteBook(book.book_id));
  };

  return (
    <div className="container">
      <div className="justify-content-around row m-3">
        <h1>Books</h1>
        <Link to="/books/new" className="btn btn-success">
          <span className="text-justify text-uppercase">Add New Book</span>
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.book_id}>
              <td>
                <Link to={`/books/${book.book_id}/show`}>{book.title}</Link>
              </td>
              <td>{book.author}</td>
              <td>
                <Link
                  to={`/books/${book.book_id}/edit`}
                  className="btn btn-primary"
                >
                  <span className="text-justify text-uppercase">Edit</span>
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(book)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Books;
