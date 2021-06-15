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
} from "./userTypes";

const initialState = {
  loading: false,
  users: [],
  currentUser: null,
  error: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: "",
      };

    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
      };

    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter((user) => user.id !== action.payload),
        error: "",
      };

    case DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [...state.users, Object.assign(action.payload)],
        error: "",
      };

    case CREATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_USER_SUCCESS:
    return {
        ...state,
        loading: false,
        error: "",
      };

    case UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
