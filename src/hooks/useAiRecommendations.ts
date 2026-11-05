import { useQuery } from "@tanstack/react-query";
import { aiRecommendationService } from "../services/aiRecommendationService";
import { petService } from "../services/petService";

export function useAiRecommendations() {
  return useQuery({
    queryKey: ["ai-recommendations"],

    queryFn: async () => {
      const pets = await petService.getMyPets();

      if (pets.length === 0) {
        return [];
      }

      const recommendationsByPet = await Promise.all(
        pets.map((pet) =>
          aiRecommendationService.getByPetId(pet.id),
        ),
      );

      return recommendationsByPet
        .flat()
        .sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

          return dateB - dateA;
        });
    },

    staleTime: 30 * 1000,
  });
}