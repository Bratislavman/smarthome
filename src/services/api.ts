import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";

const client = axios.create({
  baseURL: import.meta?.env?.VITE_API_URL || "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const setupInterceptors = () => {
  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );
};

export const setAuthToken = (token: string | null) => {
  if (token) {
    client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete client.defaults.headers.common["Authorization"];
  }
};

setupInterceptors();

export const api = client;
