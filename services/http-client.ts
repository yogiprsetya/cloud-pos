import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use((config) => {
  // Add token to headers if available

  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally (e.g., logging, redirection)
    return Promise.reject(error);
  },
);

const fetcher = (url: string) => httpClient.get(url).then((res) => res.data);

export { httpClient, fetcher };
