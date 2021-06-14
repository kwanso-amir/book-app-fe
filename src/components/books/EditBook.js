import React, { useEffect, useState } from "react";
import BookForm from "./BookForm";
import http from "../../common/http";
import { useHistory, useParams } from "react-router-dom";

function EditBook() {
  const history = useHistory();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    await http
      .get(`/books/${id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (inputs) => {
    http
      .put(`/books/${book.book_id}`, inputs)
      .then((res) => {
        history.push("/books");
      })
      .catch((err) => console.log(err));
  }

  let bookForm = book !== null ? <BookForm book={book} newBook={false} onSubmit={handleSubmit} /> : "";

  return (
    <div>
      <h1>Edit Book</h1>
      {bookForm}
    </div>
  );
}

export default EditBook;
