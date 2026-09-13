import { api } from "../api/api";

export interface SpeciesResponse {
  id: number;
  name: string;
}

export interface BreedResponse {
  id: number;
  name: string;
  speciesId: number;
}

export const speciesService = {
  getAll: async (): Promise<SpeciesResponse[]> => {
    const response =
      await api.get<SpeciesResponse[]>("/species");

    return response.data;
  },

  getBreeds: async (
    speciesId: number,
  ): Promise<BreedResponse[]> => {
    const response =
      await api.get<BreedResponse[]>(
        `/species/${speciesId}/breeds`,
      );

    return response.data;
  },
};