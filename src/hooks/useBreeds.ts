import { useQuery } from "@tanstack/react-query";

import { speciesService } from "../services/speciesService";

export function useBreeds(
  speciesId: number | null,
) {
  return useQuery({
    queryKey: ["breeds", speciesId],

    queryFn: () =>
      speciesService.getBreeds(
        speciesId as number,
      ),

    enabled: speciesId !== null,
  });
}