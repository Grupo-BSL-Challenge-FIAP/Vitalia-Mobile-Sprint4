import { api } from "../api/api";

export interface VeterinarianResponse {
  id: number;
  fullName: string;
}

export const veterinarianService = {
  getAll: async (): Promise<VeterinarianResponse[]> => {
    const response = await api.get<VeterinarianResponse[]>(
      "/veterinarians",
    );

    return response.data;
  },
};