import React, { useEffect, useState } from "react";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import { timeFormat } from "../../helper/Helpers";
import http from "../../common/http";
import { useSelector } from "react-redux";

function CommentContainer({ comment, onReplyPosted }) {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [show, setShow] = useState(false);
  const [replies, setReplies] = useState([]);
  const [reply, setReply] = useState("");

  useEffect(() => {
    setReplies(comment.replies);
  }, []);

  const userName = (user) => {
    return `${user.first_name} ${user.last_name}`;
  };

  const handleReplies = async () => {
    try {
      const payload = {
        body: reply,
        user_id: currentUser.id,
        comment_id: comment.id
      }
      const res = http.post("/replies", payload);
      
      setReply("");
      onReplyPosted();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Comment>
        <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
        <Comment.Content>
          <Comment.Author as="a">{userName(comment.user)}</Comment.Author>
          <Comment.Metadata>
            <div className="text-sm">{timeFormat(comment.createdAt)}</div>
          </Comment.Metadata>
          <Comment.Text>{comment.body}</Comment.Text>
          <Comment.Actions>
            <Comment.Action
              className="btn btn-primary"
              onClick={() => setShow(!show)}
            >
              {show ? "Hide" : "Show"} Replies
            </Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
      <div>
        {show && (
          <Form reply>
            <Comment.Group>
              <Header as="h3" dividing>
                Replies
              </Header>
            </Comment.Group>
            {replies.length > 0 &&
              replies.map((reply) => (
                <div key={reply.id}>
                  <p>{reply.body}</p>
                </div>
              ))}
            <Form.TextArea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            <Button
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              primary
              className="btn btn-info mb-4 mt-2"
              onClick={handleReplies}
            />
          </Form>
        )}
      </div>
    </div>
  );
}

export default CommentContainer;
