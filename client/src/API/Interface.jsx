import axios from "axios";

const endPoint = axios.create({
  baseURL: "https://wholesome-forgiveness-production.up.railway.app",
  // baseURL: "http://6801702b9f68.ngrok-free.app",
});

export default endPoint;
