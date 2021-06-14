import React from "react";
import UserForm from "./UserForm";
import http from "../../common/http";
import { useHistory } from "react-router-dom";

function NewUser() {
  const history = useHistory();

  const handleSubmit = (inputs) => {
    http
      .post(`/users`, inputs)
      .then((res) => {
        history.push("/users");
      })
      .catch((err) => console.log(err));
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
