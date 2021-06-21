import React, { useEffect, useReducer } from "react";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import { timeFormat } from "../../helper/Helpers";
import http from "../../common/http";
import { useSelector } from "react-redux";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SHOW":
      return { ...state, show: !state.show };

    case "SET_REPLIES":
      return { ...state, loading: false, commentReplies: [...action.payload] };

    case "SET_REPLY":
      return { ...state, replyText: action.payload };

    default:
      return state;
  }
};

function CommentContainer({ comment, onReplyPosted }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const localState = {
    commentReplies: [],
    show: false,
    replyText: "",
    loading: true,
  };

  const [state, localDispatch] = useReducer(reducer, localState);

  useEffect(() => {
    localDispatch({ type: "SET_REPLIES", payload: comment.replies });
    console.log(state);
  }, []);

  const userName = (user) => {
    return `${user.first_name} ${user.last_name}`;
  };

  const handleReplies = async () => {
    try {
      const payload = {
        body: state.replyText,
        user_id: currentUser.id,
        comment_id: comment.id,
      };
      const res = http.post("/replies", payload);

      localDispatch({ type: "SET_REPLY", payload: "" });
      onReplyPosted();
    } catch (error) {
      console.log(error);
    }
  };

  const { show, replyText, loading, commentReplies } = state;
  const renderComments = loading ? (
    <div className="spinner-border mt-5" role="status">
      <span className="visually-hidden"></span>
    </div>
  ) : (
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
              onClick={() => localDispatch({ type: "SET_SHOW" })}
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
            {commentReplies.length > 0 &&
              commentReplies.map((reply) => (
                <div key={reply.id} className="mt-4">
                  <h5>
                    <span className="text-uppercase">
                      {userName(reply.user)}
                    </span>
                  </h5>
                  <p>{reply.body}</p>
                  <span className="">{timeFormat(comment.createdAt)}</span>
                </div>
              ))}
            <Form.TextArea
              value={replyText}
              onChange={(e) =>
                localDispatch({ type: "SET_REPLY", payload: e.target.value })
              }
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

  return renderComments;
}

export default CommentContainer;
