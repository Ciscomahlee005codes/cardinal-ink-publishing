import axios from "axios";

const endPoint = axios.create({
  baseURL: "http://localhost:3000/",
  // baseURL: "http://6801702b9f68.ngrok-free.app",
});

export default endPoint;
