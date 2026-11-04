import { useQuery } from "@tanstack/react-query";

import { veterinarianService } from "../services/veterinarianService";

export function useVeterinarians() {
  return useQuery({
    queryKey: ["veterinarians"],
    queryFn: veterinarianService.getAll,
  });
}