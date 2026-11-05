import { api } from "../api/api";

export interface AiRecommendationResponse {
  id: number;
  petId: number;
  recommendationType: string;
  content: string;
  confidence?: number | null;
  createdAt?: string | null;
}

export const aiRecommendationService = {
  getByPetId: async (
    petId: number,
  ): Promise<AiRecommendationResponse[]> => {
    const response = await api.get<AiRecommendationResponse[]>(
      `/api/ai-recommendations/pet/${petId}`,
    );

    return response.data;
  },
};