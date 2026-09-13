import { useQuery } from "@tanstack/react-query";

import { speciesService } from "../services/speciesService";

export function useSpecies() {
  return useQuery({
    queryKey: ["species"],
    queryFn: speciesService.getAll,
  });
}