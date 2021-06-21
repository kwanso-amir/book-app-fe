import BookForm from "./BookForm";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBook } from "../../redux";
import { useEffect } from "react";
import { setCurrentUser } from "../../redux";

function NewBook() {
  const currentUser = useSelector((state) => state.user.currentUser);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    await dispatch(setCurrentUser());
  };

  const handleSubmit = (inputs) => {
    const payload = { ...inputs, user_id: currentUser.id };
    dispatch(createBook(payload));

    history.push("/books");
  };

  const bookForm = <BookForm newBook={true} onSubmit={handleSubmit} />;
  return (
    currentUser && (
      <div>
        <h1>Add New Book</h1>
        {bookForm}
      </div>
    )
  );
}

export default NewBook;
