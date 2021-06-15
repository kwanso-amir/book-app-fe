import React from "react";
import UserForm from "./UserForm";
import http from "../../common/http";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../redux";

function NewUser() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (inputs) => {
    dispatch(createUser(inputs));
    history.push("/users");
  };

  let userForm = <UserForm newUser={true} onSubmit={handleSubmit} />;
  return (
    <div>
      <h1>Add New User</h1>
      {userForm}
    </div>
  );
}

export default NewUser;
