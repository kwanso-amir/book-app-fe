import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";
import http from "../../common/http";
import { useHistory, useParams } from "react-router-dom";

function EditUser() {
  const history = useHistory();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    await http
      .get(`/users/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (inputs) => {
    http
      .put(`/users/${user.id}`, inputs)
      .then((res) => {
        history.push("/users");
      })
      .catch((err) => console.log(err));
  }

  let userForm = user !== null ? <UserForm user={user} newUser={false} onSubmit={handleSubmit} /> : "";

  return (
    <div>
      <h1>Edit User</h1>
      {userForm}
    </div>
  );
}

export default EditUser;
