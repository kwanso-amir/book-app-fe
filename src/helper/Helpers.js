export const currentUser = function () {
  return true;
};

export const isLoggedIn = function () {
  const token = localStorage.getItem("token");
  if (token) return true;

  return false;
};

export const logout = function () {
  localStorage.clear()
};
