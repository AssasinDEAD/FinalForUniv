import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.225.12:3000",  // Здесь заменяешь на свой IP-адрес
  withCredentials: true, 
});

export default axiosInstance;
