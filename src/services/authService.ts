import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "../api/api";

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  cpf: string;
  dateOfBirth: string;
  address: string;
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

export interface MeResponse {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  cpf: string;
  dateOfBirth: string;
  address: string;
  roles: {
    id: number;
    name: string;
  }[];
}

export const authService = {
  register: async (
    data: RegisterRequest,
  ): Promise<void> => {
    await api.post("/auth/register", data);
  },

  login: async (
    data: LoginRequest,
  ): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(
      "/auth/login",
      data,
    );

    await AsyncStorage.setItem(
      "@vitalia:token",
      response.data.token,
    );

    return response.data;
  },

  me: async (): Promise<MeResponse> => {
    const response = await api.get<MeResponse>(
      "/auth/me",
    );

    return response.data;
  },
};