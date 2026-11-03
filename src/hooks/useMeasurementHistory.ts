import { useQuery } from "@tanstack/react-query";
import { measurementService } from "../services/measurementService";

export function useMeasurementHistory(petId?: number | null) {
  return useQuery({
    queryKey: ["measurement-history", petId],
    queryFn: () => measurementService.getHistoryByPetId(petId!),
    enabled: petId !== null && petId !== undefined,
    staleTime: 30 * 1000,
  });
}