import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "../api/api";

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  id: number;
  roles: {
    id: number;
    name: string;
  }[];
}

export const authService = {
  register: async (data: RegisterRequest) => {
    await api.post("/auth/register", data);
  },

  login: async (data: LoginRequest) => {
    const response = await api.post<LoginResponse>(
      "/auth/login",
      data
    );

    await AsyncStorage.setItem(
      "@vitalia:token",
      response.data.token
    );

    return response.data;
  },
};