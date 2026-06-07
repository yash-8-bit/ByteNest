import axios from "axios";
import ls from "../../utils/ls.util"

const token = ls.tokenStore.get();

const Api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers : {
    Authorization : `Bearer ${token}`
  }
});



export default Api;
