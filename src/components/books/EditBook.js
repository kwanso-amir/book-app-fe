import React, { useEffect, useReducer } from "react";
import BookForm from "./BookForm";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateBook } from "../../redux";
import http from "../../common/http";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_BOOK":
      return { ...state, book: action.payload };

    default:
      return state;
  }
};

const EditBook = () => {
  const history = useHistory();
  const { id } = useParams();
  const localState = {
    book: null,
  };
  const [state, localDispatch] = useReducer(reducer, localState);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const res = await http.get(`/books/${id}`);

      localDispatch({ type: "SET_BOOK", payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (data) => {
    dispatch(updateBook({ id, data }));

    history.push("/books");
  };

  let bookForm =
    state.book !== null ? (
      <div>
        <BookForm book={state.book} newBook={false} onSubmit={handleSubmit} />
      </div>
    ) : (
      <div className="spinner-border mt-5" role="status">
        <span className="visually-hidden"></span>
      </div>
    );
  
  return (
    <div>
      <h1>Edit Book</h1>
      {bookForm}
    </div>
  );
};

export default EditBook;
