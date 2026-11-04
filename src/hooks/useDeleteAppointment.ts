import { useMutation, useQueryClient } from "@tanstack/react-query";
import { appointmentService } from "../services/appointmentService";

export function useDeleteAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (appointmentId: number) => appointmentService.deleteById(appointmentId),

    onSuccess: async (_data, appointmentId) => {
      queryClient.removeQueries({
        queryKey: ["appointment", appointmentId],
      });

      await queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
    },
  });
}