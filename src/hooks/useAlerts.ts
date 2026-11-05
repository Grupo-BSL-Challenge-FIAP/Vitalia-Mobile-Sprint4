import { useQuery } from "@tanstack/react-query";
import { alertService } from "../services/alertService";
import { petService } from "../services/petService";

export function useAlerts() {
  return useQuery({
    queryKey: ["alerts"],

    queryFn: async () => {
      const pets = await petService.getMyPets();

      if (pets.length === 0) {
        return [];
      }

      const alertsByPet = await Promise.all(
        pets.map((pet) => alertService.getByPetId(pet.id)),
      );

      return alertsByPet
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