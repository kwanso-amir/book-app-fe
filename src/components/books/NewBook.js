import React from "react";
import BookForm from "./BookForm";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createBook } from "../../redux";

function NewBook() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (inputs) => {
    dispatch(createBook(inputs));

    history.push("/books");
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
