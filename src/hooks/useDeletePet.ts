import { useMutation } from "@tanstack/react-query";

import { petService } from "../services/petService";
import { queryClient } from "../api/queryClient";

export function useDeletePet() {
  return useMutation({
    mutationFn: (id: number) =>
      petService.remove(id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["my-pets"],
      });
    },
  });
}