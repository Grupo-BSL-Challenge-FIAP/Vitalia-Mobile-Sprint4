import axios from "axios";
import { tokenStorage } from "../storage/tokenStorage";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_JAVA_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token =
      await tokenStorage.get();

    if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
);