import { api } from "../api/api";

export interface UpdateCurrentUserRequest {
  fullName: string;
  phoneNumber: string;
  cpf: string;
  dateOfBirth: string;
  address: string;
}

export const userService = {
  updateMe: async (
    data: UpdateCurrentUserRequest,
  ): Promise<void> => {
    await api.put(
      "/users/me",
      data,
    );
  },
};