import React, { useState } from "react";
import { useSelector } from "react-redux";
import http from "../../common/http";

const CommentInput = ({ bookId, onCommentPosted }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [body, setBody] = useState("");

  const postComment = async (e) => {
    e.preventDefault();
    console.log(body, currentUser.id, bookId);
    try {
      const res = await http.post("/comments", {
        body,
        user_id: currentUser.id,
        book_id: bookId,
        type: "comment",
      });

      setBody("");
      onCommentPosted();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      {body}
      <form onSubmit={postComment} className="flex justify-content-between">
        <input
          type="text"
          value={body}
          className="form-control"
          placeholder="Comment.."
          onChange={(e) => setBody(e.target.value)}
        />
        <button className="btn btn-primary">Post</button>
      </form>
    </div>
  );
};

export default CommentInput;
