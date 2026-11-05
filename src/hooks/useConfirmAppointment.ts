import { useMutation, useQueryClient } from "@tanstack/react-query";
import { appointmentService } from "../services/appointmentService";

export function useConfirmAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (appointmentId: number) =>
      appointmentService.confirmById(appointmentId),

    onSuccess: async (_data, appointmentId) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["appointment", appointmentId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["appointments"],
        }),
      ]);
    },
  });
}