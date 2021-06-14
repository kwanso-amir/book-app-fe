import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../common/http";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    http
      .get("/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (user) => {
    http
      .delete(`/users/${user.id}`)
      .then((res) => {
        fetchUsers();
      })
      .catch((err) => console.log(err));
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
                <button className="btn btn-danger" onClick={() => handleDelete(user)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
