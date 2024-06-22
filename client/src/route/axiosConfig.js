import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Replace with your Laravel backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchCsrfToken = async () => {
  try {
    const response = await axiosInstance.get('/sanctum/csrf-cookie');
    return response.data.csrf_token;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    throw error;
  }
};

// Function to set CSRF token in Axios headers
export const setCsrfToken = (token) => {
  axiosInstance.defaults.headers.common['X-CSRF-TOKEN'] = token;
};

export default axiosInstance;

