import api from "./api";

/* Login */

export const loginUser = (payload) => {
  return api.post("/auth/login", payload);
};

/* Current User */

export const getCurrentUser = () => {
  return api.get("/auth/current-user");
};

/* Logout */

export const logoutUser = () => {
  return api.post("/auth/logout");
};
