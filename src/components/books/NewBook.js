import React from "react";
import BookForm from "./BookForm";
import http from "../../common/http";
import { useHistory } from "react-router-dom";

function NewBook() {
  const history = useHistory();

  const handleSubmit = (inputs) => {
    http
      .post(`/books`, inputs)
      .then((res) => {
        history.push("/books");
      })
      .catch((err) => console.log(err));
  };

  let bookForm = <BookForm newBook={true} onSubmit={handleSubmit} />;
  return (
    <div>
      <h1>Add New Book</h1>
      {bookForm}
    </div>
  );
}

export default NewBook;
