import { useQuery } from "@tanstack/react-query";
import { measurementService } from "../services/measurementService";

export function useLatestMeasurement(petId?: number | null) {
  return useQuery({
    queryKey: ["latest-measurement", petId],
    queryFn: () => measurementService.getLatestByPetId(petId!),
    enabled: petId !== null && petId !== undefined,
    staleTime: 30 * 1000,
  });
}