import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function BookForm({book, newBook, onSubmit}) {
  const history = useHistory();

  const [input, setInput] = useState({
    title: "",
    author: "",
    image: "",
  });

  useEffect(() => {
    if (!newBook) {
      setInput({
        title: book.title,
        author: book.author,
        image: book.image,
      });
    }
  }, []);

  const handleInpuChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(input);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            id="title"
            value={input.title || ""}
            onChange={handleInpuChange}
          />
        </div>
        <div className="form-group">
          <label>Author Name</label>
          <input
            type="text"
            name="author"
            className="form-control"
            id="author"
            value={input.author || ""}
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

export default BookForm;
