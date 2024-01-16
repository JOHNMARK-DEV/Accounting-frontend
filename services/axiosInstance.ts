import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5081/api/', // Replace with your API base URL
});

export default axiosInstance;