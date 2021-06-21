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
  return async (dispatch) => {
    try {
      dispatch(fetchBooksRequest);
      const res = await http.get(`/books`);

      dispatch(fetchBooksSuccess(res.data));
    } catch (err) {
      dispatch(fetchBooksFailure(err));
    }
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
  return async (dispatch) => {
    try {
      dispatch(deleteBookRequest);
      const res = await http.delete(`/books/${id}`);

      dispatch(deleteBookSuccess(id));
    } catch (error) {
      dispatch(deleteBookFailure(error));
    }
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
  return async (dispatch) => {
    try {
      dispatch(createBookRequest);
      const res = await http.post(`/books`, payload);

      dispatch(createBookSuccess(res.data));
    } catch (error) {
      dispatch(createBookFailure(error));
    }
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
  return async (dispatch) => {
    try {
      dispatch(updateBookRequest);
      const res = await http.put(`/books/${payload.id}`, payload.data);

      dispatch(updateBookSuccess(res.data));
    } catch (error) {
      dispatch(updateBookFailure(error));
    }
  };
};
