import { useMutation } from "@tanstack/react-query";

import {
  petService,
  PetRequest,
} from "../services/petService";

import { queryClient } from "../api/queryClient";

interface UpdatePetData {
  id: number;
  data: PetRequest;
}

export function useUpdatePet() {
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: UpdatePetData) =>
      petService.update(id, data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["my-pets"],
      });
    },
  });
}