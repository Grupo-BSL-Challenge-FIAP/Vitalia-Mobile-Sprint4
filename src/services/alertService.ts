import { api } from "../api/api";

export interface AlertResponse {
  id: number;
  type?: string | null;
  message?: string | null;
  severity?: string | null;
  createdAt?: string | null;
  petId?: number | null;
}

interface AlertPageResponse {
  content: AlertResponse[];
}

export const alertService = {
  getByPetId: async (petId: number): Promise<AlertResponse[]> => {
    const response = await api.get<
      AlertResponse[] | AlertPageResponse
    >(`/alerts/pet/${petId}`);

    if (Array.isArray(response.data)) {
      return response.data;
    }

    return response.data.content ?? [];
  },
};