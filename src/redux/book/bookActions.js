import http from "../../common/http";

import {
  FETCH_BOOKS_FAILURE,
  FETCH_BOOKS_REQUEST,
  FETCH_BOOKS_SUCCESS,
  DELETE_BOOK_FAILURE,
  DELETE_BOOK_REQUEST,
  DELETE_BOOK_SUCCESS,
  UPDATE_BOOK_FAILURE,
  UPDATE_BOOK_REQUEST,
  UPDATE_BOOK_SUCCESS,
  CREATE_BOOK_FAILURE,
  CREATE_BOOK_REQUEST,
  CREATE_BOOK_SUCCESS,
} from "./bookTypes";

export const fetchBooksRequest = () => {
  return {
    type: FETCH_BOOKS_REQUEST,
  };
};

export const fetchBooksSuccess = (payload) => {
  return {
    type: FETCH_BOOKS_SUCCESS,
    payload: payload,
  };
};

export const fetchBooksFailure = (error) => {
  return {
    type: FETCH_BOOKS_FAILURE,
    payload: error,
  };
};

export const fetchBooks = () => {
  return (dispatch) => {
    dispatch(fetchBooksRequest);
    http
      .get(`/books`)
      .then((res) => {
        dispatch(fetchBooksSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchBooksFailure(err));
      });
  };
};

export const deleteBookRequest = () => {
  return {
    type: DELETE_BOOK_REQUEST,
  };
};

export const deleteBookSuccess = (id) => {
  return {
    type: DELETE_BOOK_SUCCESS,
    payload: id,
  };
};

export const deleteBookFailure = (error) => {
  return {
    type: DELETE_BOOK_FAILURE,
    payload: error,
  };
};

export const deleteBook = (id) => {
  return (dispatch) => {
    dispatch(deleteBookRequest);
    http
      .delete(`/books/${id}`)
      .then((res) => {
        dispatch(deleteBookSuccess(id));
      })
      .catch((err) => {
        dispatch(deleteBookFailure(err));
      });
  };
};

export const createBookRequest = () => {
  return {
    type: CREATE_BOOK_REQUEST,
  };
};

export const createBookSuccess = (payload) => {
  return {
    type: CREATE_BOOK_SUCCESS,
    payload: payload,
  };
};

export const createBookFailure = (error) => {
  return {
    type: CREATE_BOOK_FAILURE,
    payload: error,
  };
};

export const createBook = (payload) => {
  return (dispatch) => {
    dispatch(createBookRequest);
    http
      .post(`/books`, payload)
      .then((res) => {
        dispatch(createBookSuccess(res.data));
      })
      .catch((err) => {
        dispatch(createBookFailure(err));
      });
  };
};

export const updateBookRequest = () => {
  return {
    type: UPDATE_BOOK_REQUEST,
  };
};

export const updateBookSuccess = (payload) => {
  return {
    type: UPDATE_BOOK_SUCCESS,
    payload: payload,
  };
};

export const updateBookFailure = (error) => {
  return {
    type: UPDATE_BOOK_FAILURE,
    payload: error,
  };
};

export const updateBook = (payload) => {
  return (dispatch) => {
    dispatch(updateBookRequest);
    http
      .put(`/books/${payload.id}`, payload.data)
      .then((res) => {
        dispatch(updateBookSuccess(res.data));
      })
      .catch((err) => {
        dispatch(updateBookFailure(err));
      });
  };
};
