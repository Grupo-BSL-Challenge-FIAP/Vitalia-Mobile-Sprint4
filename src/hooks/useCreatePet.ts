import { useMutation } from "@tanstack/react-query";
import { PetRequest, petService } from "../services/petService";
import { queryClient } from "../api/queryClient";

export function useCreatePet() {
  return useMutation({
    mutationFn: (data: PetRequest) => petService.create(data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["my-pets"],
      });
    },
  });
}