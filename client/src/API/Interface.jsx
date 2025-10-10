import axios from "axios";

const endPoint = axios.create({
  baseURL: import.meta.env.VITE_BASEURL
});

export default endPoint;
