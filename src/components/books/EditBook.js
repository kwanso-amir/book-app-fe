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
    try {
      const res = await http.get(`/books/${id}`);
      setBook(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (data) => {
    dispatch(updateBook({ id, data }));

    history.push("/books");
  };

  const bookForm = book !== null && <BookForm book={book} newBook={false} onSubmit={handleSubmit} />
// tO-DO ADD LOADING COMP
  return (
    
    <div>
      <h1>Edit Book</h1>
      {bookForm} 
    </div>
  );
}

export default EditBook;
