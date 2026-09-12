import { api } from "../api/api";

export interface PetRequest {
  name: string;
  sex: string;
  birthDate: string;
  weightKg: number;
  status?: "NORMAL" | "ATTENTION" | "RISK";
  breedId?: number | null;
}

export interface PetResponse {
  id: number;
  name: string;
  sex: string;
  birthDate: string;
  weightKg: number;
  status: string;
  ownerUserId: number;
  breedId: number | null;
}

export const petService = {
  create: async (data: PetRequest): Promise<PetResponse> => {
    const response = await api.post<PetResponse>(
      "/pets",
      data
    );

    return response.data;
  },
};