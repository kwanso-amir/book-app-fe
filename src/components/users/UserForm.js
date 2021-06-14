import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import http from "../../common/http";

function UserForm(props) {
  const history = useHistory();

  const [input, setInput] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    image: "",
  });

  useEffect(() => {
    if (!props.newUser) {
      setInput({
        ...input,
        first_name: props.user.first_name,
        last_name: props.user.last_name,
        email: props.user.email,
        password: props.user.password,
        image: props.user.image,
      });
    }
  }, []);

  const handleInpuChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(input);
  };

  return (
    <div className="container">
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
        {props.newUser && (
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
        )}

        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>{" "}
    </div>
  );
}

export default UserForm;
