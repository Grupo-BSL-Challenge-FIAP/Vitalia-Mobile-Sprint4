import { useQuery } from "@tanstack/react-query";
import { appointmentService } from "../services/appointmentService";

export function useAppointmentById(appointmentId: number) {
  return useQuery({
    queryKey: ["appointment", appointmentId],
    queryFn: () => appointmentService.getById(appointmentId),
    enabled: !!appointmentId,
  });
}