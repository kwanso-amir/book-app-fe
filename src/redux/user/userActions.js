import http from "../../common/http";

import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CURRENT_USER_FAILURE,
  CURRENT_USER_REQUEST,
  CURRENT_USER_SUCCESS,
} from "./userTypes";

export const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

export const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

export const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchUsersRequest);
      const res = await http.get(`/users`);

      dispatch(fetchUsersSuccess(res.data));
    } catch (err) {
      dispatch(fetchUsersFailure(err));
    }
  };
};

export const deleteUserRequest = () => {
  return {
    type: DELETE_USER_REQUEST,
  };
};

export const deleteUserSuccess = (id) => {
  return {
    type: DELETE_USER_SUCCESS,
    payload: id,
  };
};

export const deleteUserFailure = (error) => {
  return {
    type: DELETE_USER_FAILURE,
    payload: error,
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      dispatch(deleteUserRequest);
      const res = await http.delete(`/users/${id}`);
      dispatch(deleteUserSuccess(id));
    } catch (err) {
      dispatch(deleteUserFailure(err));
    }
  };
};

export const createUserRequest = () => {
  return {
    type: CREATE_USER_REQUEST,
  };
};

export const createUserSuccess = (payload) => {
  return {
    type: CREATE_USER_SUCCESS,
    payload: payload,
  };
};

export const createUserFailure = (error) => {
  return {
    type: CREATE_USER_FAILURE,
    payload: error,
  };
};

export const createUser = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(createUserRequest);
      const res = await http.post(`/users`, payload);

      dispatch(createUserSuccess(res.data));
    } catch (err) {
      dispatch(createUserFailure(err));
    }
  };
};

export const updateUserRequest = () => {
  return {
    type: UPDATE_USER_REQUEST,
  };
};

export const updateUserSuccess = (id) => {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: id,
  };
};

export const updateUserFailure = (error) => {
  return {
    type: UPDATE_USER_FAILURE,
    payload: error,
  };
};

export const updateUser = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(updateUserRequest);
      const res = await http.put(`/users/${payload.id}`, payload.data);

      dispatch(updateUserSuccess(res.data));
    } catch (err) {
      dispatch(updateUserFailure(err));
    }
  };
};

export const currentUserRequest = () => {
  return {
    type: CURRENT_USER_REQUEST,
  };
};

export const currentUserSuccess = (user) => {
  return {
    type: CURRENT_USER_SUCCESS,
    payload: user,
  };
};

export const currentUserFailure = (error) => {
  return {
    type: CURRENT_USER_FAILURE,
    payload: error,
  };
};

export const setCurrentUser = () => {
  return async (dispatch) => {
    try {
      dispatch(currentUserRequest);
      const res = await http.get(`/users/me`);

      dispatch(currentUserSuccess(res.data));
    } catch (err) {
      dispatch(currentUserFailure(err));
    }
  };
};
