import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import http from "../../common/http";
import Comments from "../comments/Comments";
import CommentInput from "../comments/CommentInput";
import Books from "./Books";

function ShowBook() {
  const history = useHistory();
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchBook();
  }, []);

  // TODO: Remove .then use try catch

  const fetchBook = async () => {
    try {
      const response = await http.get(`/books/${id}`);

      setBook(response.data);
      setComments(response.data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  const updateComments = () => {
    fetchBook();
  };

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
      "Loading ..."
    );

  return <div>{bookContainer}</div>;
}

export default ShowBook;
