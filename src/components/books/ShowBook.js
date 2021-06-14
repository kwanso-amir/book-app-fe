import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import http from "../../common/http";

function ShowBook() {
  const history = useHistory();
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    await http
      .get(`/books/${id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => console.log(err));
  };

  let bookContainer =
    book !== null ? (
      <div className="container">
        <h1>Title: {book.title}</h1>
        <h3>Author: {book.author}</h3>
      </div>
    ) : (
      "Loading ..."
    );

  return (
    <div>
      {bookContainer}
      <div>comments</div>
    </div>
  );
}

export default ShowBook;
