import React, { useEffect, useState } from "react";
import BookForm from "./BookForm";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateBook } from "../../redux";
import http from "../../common/http";

function EditBook() {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [book, setBook] = useState(null);

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
    dispatch(updateBook({ id: id, data: inputs }));

    history.push("/books");
  };

  let bookForm =
    book !== null ? (
      <BookForm book={book} newBook={false} onSubmit={handleSubmit} />
    ) : (
      ""
    );

  return (
    <div>
      <h1>Edit Book</h1>
      {bookForm}
    </div>
  );
}

export default EditBook;
