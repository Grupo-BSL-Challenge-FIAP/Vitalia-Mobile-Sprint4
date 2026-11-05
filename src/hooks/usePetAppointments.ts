import { useQuery } from "@tanstack/react-query";
import { appointmentService } from "../services/appointmentService";

export function usePetAppointments(petId?: number | null) {
  return useQuery({
    queryKey: ["appointments", petId],
    queryFn: () => appointmentService.getByPetId(petId!),
    enabled: petId !== null && petId !== undefined,
    staleTime: 30 * 1000,
  });
}