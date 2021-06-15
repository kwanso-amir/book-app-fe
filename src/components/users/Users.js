import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../../redux";

function Users() {
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleDelete = (user) => {
    dispatch(deleteUser(user.id));
  };

  return (
    <div className="container">
      <div className="justify-content-around row m-3">
        <h1>Users</h1>
        <Link to="/users/new" className="btn btn-success">
          <span className="text-justify text-uppercase">Add New User</span>
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>
                <Link to={`/users/${user.id}/edit`} className="btn btn-primary">
                  <span className="text-justify text-uppercase">Edit</span>
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
