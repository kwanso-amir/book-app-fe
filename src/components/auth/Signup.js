import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import http from "../../common/http";

function Signup(props) {
  const history = useHistory();

  const [input, setInput] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    image: "",
  });

  const handleInpuChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    http
      .post("/auth/signup", input)
      .then((res) => {
        console.log(res.data)
        localStorage.setItem('token', res.data.token)
        window.location = "/books";
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            className="form-control"
            id="first name"
            value={input.first_name || ""}
            onChange={handleInpuChange}
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            className="form-control"
            id="last name"
            value={input.last_name || ""}
            onChange={handleInpuChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            value={input.email || ""}
            onChange={handleInpuChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            value={input.password || ""}
            onChange={handleInpuChange}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>{" "}
    </div>
  );
}

export default Signup;
