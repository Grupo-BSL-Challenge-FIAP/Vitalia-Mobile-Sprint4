import { api } from "../api/api";

export interface PetRequest {
  name: string;
  sex: string;
  birthDate: string;
  weightKg: number;
  status: "NORMAL" | "ATTENTION" | "CRITICAL";
  breedId: number | null;
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
  breedName: string | null;
  speciesId: number | null;
  speciesName: string | null;
}

interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export const petService = {
  create: async (
    data: PetRequest,
  ): Promise<PetResponse> => {
    const response = await api.post<PetResponse>(
      "/pets",
      data,
    );

    return response.data;
  },

  getMyPets: async (): Promise<PetResponse[]> => {
    const response = await api.get<PageResponse<PetResponse>>(
      "/pets/my-pets",
      {
        params: {
          page: 0,
          size: 10,
          sort: "id",
        },
      },
    );

    return response.data.content;
  },
};