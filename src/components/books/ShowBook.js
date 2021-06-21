import React, { useEffect, useReducer } from "react";
import { useHistory, useParams } from "react-router";
import http from "../../common/http";
import Comments from "../comments/Comments";
import CommentInput from "../comments/CommentInput";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_BOOK":
      return { ...state, book: action.payload };

    case "SET_COMMENTS":
      return { ...state, comments: action.payload };
    default:
      return state;
  }
};

const ShowBook = () => {
  const { id } = useParams();
  const localState = {
    book: {},
    comments: [],
  };
  const [state, localDispatch] = useReducer(reducer, localState);

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const response = await http.get(`/books/${id}`);

      localDispatch({ type: "SET_BOOK", payload: response.data });
      localDispatch({ type: "SET_COMMENTS", payload: response.data.comments });
    } catch (error) {
      console.log(error);
    }
  };

  const updateComments = () => {
    fetchBook();
  };
  const { book, comments } = state;

  let bookContainer =
    book !== null ? (
      <div className="container">
        <h1>Title: {book.title}</h1>
        <h3>Author: {book.author}</h3>
        {comments.length > 0 && (
          <Comments comments={comments} onCommentPosted={updateComments} />
        )}
        <CommentInput bookId={id} onCommentPosted={updateComments} />
      </div>
    ) : (
      <div class="spinner-border mt-5" role="status">
        <span class="visually-hidden"></span>
      </div>
    );

  return <div>{bookContainer}</div>;
};

export default ShowBook;
