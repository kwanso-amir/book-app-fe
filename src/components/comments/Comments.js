import React from "react";
import { Comment, Header } from "semantic-ui-react";
import CommentContainer from "./CommentContainer";

function Comments({ comments, onCommentPosted }) {
  return (
    <div>
      <Comment.Group>
        <Header as="h3" dividing>
          Comments
        </Header>

        {comments.map((comment) => (
          <div className="mt-2" key={comment.id}>
            <CommentContainer
              comment={comment}
              onReplyPosted={() => onCommentPosted()}
            />
          </div>
        ))}
      </Comment.Group>
    </div>
  );
}

export default Comments;
