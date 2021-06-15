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
  return (dispatch) => {
    dispatch(fetchUsersRequest);
    http
      .get(`/users`)
      .then((res) => {
        dispatch(fetchUsersSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchUsersFailure(err));
      });
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
  return (dispatch) => {
    dispatch(deleteUserRequest);
    http
      .delete(`/users/${id}`)
      .then((res) => {
        dispatch(deleteUserSuccess(id));
      })
      .catch((err) => {
        dispatch(deleteUserFailure(err));
      });
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
  return (dispatch) => {
    dispatch(createUserRequest);
    http
      .post(`/users`, payload)
      .then((res) => {
        dispatch(createUserSuccess(res.data));
      })
      .catch((err) => {
        dispatch(createUserFailure(err));
      });
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
  return (dispatch) => {
    dispatch(updateUserRequest);
    http
      .put(`/users/${payload.id}`, payload.data)
      .then((res) => {
        console.log("res ====", res)
        dispatch(updateUserSuccess(res.data));
      })
      .catch((err) => {
        dispatch(updateUserFailure(err));
      });
  };
};

export const currentUserRequest = () => {
  return {
    type: CURRENT_USER_REQUEST,
  };
};

export const currentUserSuccess = (id) => {
  return {
    type: CURRENT_USER_SUCCESS,
    payload: id,
  };
};

export const currentUserFailure = (error) => {
  return {
    type: CURRENT_USER_FAILURE,
    payload: error,
  };
};

export const currentUser = () => {
  return (dispatch) => {
    dispatch(currentUserRequest);
    http
      .get(`/me`)
      .then((res) => {
        dispatch(currentUserSuccess(res.data));
      })
      .catch((err) => {
        dispatch(currentUserFailure(err));
      });
  };
};
