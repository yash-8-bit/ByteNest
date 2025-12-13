import axios from "axios";
import ls from "../../utils/ls.util";

const token = ls.ls1.get();

const Api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

Api.defaults.headers.common['Authorization'] =  `Bearer ${token}`;


export default Api;
