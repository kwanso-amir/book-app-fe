import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, deleteBook } from "../../redux";

function Books() {
  const { books, loading } = useSelector((state) => state.book);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    await dispatch(fetchBooks());
  };

  const userName = (book) => {
    if (book.user !== undefined) {
      return `${book.user.first_name} ${book.user.last_name}`;
    } else return "No name";
  };

  const renderBooks = loading ? (
    <div className="spinner-border mt-5" role="status">
      <span className="visually-hidden"></span>
    </div>
  ) : (
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
            <th scope="col">Added by</th>
            <th scope="col">Data</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>
                <Link to={`/books/${book.id}/show`}>{book.title}</Link>
              </td>
              <td>{book.author}</td>
              <td>{userName(book)}</td>
              <td>{Date(book.createdAt)}</td>
              <td>
                <Link to={`/books/${book.id}/edit`} className="btn btn-primary">
                  <span className="text-justify text-uppercase">Edit</span>
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => dispatch(deleteBook(book.id))}
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

  return renderBooks;
}

export default Books;
