import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../common/http";

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    console.log(localStorage, "=======")
    http
      .get("/books")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (book) => {
    http
      .delete(`/books/${book.id}`)
      .then((res) => {
        fetchBooks();
      })
      .catch((err) => console.log(err));
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
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <Link to={`/books/${book.book_id}/edit`} className="btn btn-primary">
                  <span className="text-justify text-uppercase">Edit</span>
                </Link>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(book)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Books;
