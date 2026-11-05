import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  appointmentService,
  type AppointmentCreateRequest,
} from "../services/appointmentService";

export function useCreateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: AppointmentCreateRequest) =>
      appointmentService.create(request),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
    },
  });
}