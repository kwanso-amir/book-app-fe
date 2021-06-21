import moment from "moment";

export const currentUser = function () {
  return true;
};

export const isLoggedIn = function () {
  const token = localStorage.getItem("token");
  if (token) return true;

  return false;
};

export const logout = function () {
  localStorage.clear();
};

export const timeFormat = function (time) {
  return moment(time).format("DD-MM-YY hh:mm");
};
