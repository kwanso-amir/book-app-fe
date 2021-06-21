import axios from "axios";

const instance = axios.create({
  baseURL: "https://book-app-server-node.herokuapp.com",
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export default instance;
