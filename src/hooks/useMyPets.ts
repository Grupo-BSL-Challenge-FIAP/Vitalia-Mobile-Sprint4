import { useQuery } from "@tanstack/react-query";

import { petService } from "../services/petService";

export function useMyPets() {
  return useQuery({
    queryKey: ["my-pets"],
    queryFn: petService.getMyPets,
  });
}