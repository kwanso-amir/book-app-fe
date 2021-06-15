import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";
import http from "../../common/http";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, fetchUsers } from "../../redux";

function EditUser() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [user, setUser] = useState(null);

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
    dispatch(updateUser({ id: id, data: inputs }));
  
    history.push("/users");
  };

  let userForm =
    user !== null ? (
      <UserForm user={user} newUser={false} onSubmit={handleSubmit} />
    ) : (
      ""
    );

  return (
    <div>
      <h1>Edit User</h1>
      {userForm}
    </div>
  );
}

export default EditUser;
