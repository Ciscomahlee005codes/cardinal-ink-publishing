import axios from "axios";

const endPoint = axios.create({
  baseURL: "http://localhost:3000/",
});

export default endPoint;
