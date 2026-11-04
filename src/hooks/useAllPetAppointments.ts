import { useQueries } from "@tanstack/react-query";
import { appointmentService } from "../services/appointmentService";

export function useAllPetAppointments(petIds: number[]) {
  const queries = useQueries({
    queries: petIds.map((petId) => ({
      queryKey: ["appointments", petId],
      queryFn: () => appointmentService.getByPetId(petId),
      staleTime: 30 * 1000,
    })),
  });

  const data = queries.flatMap((query) => query.data ?? []);

  const isLoading = queries.some(
    (query) => query.isLoading,
  );

  const isError = queries.some(
    (query) => query.isError,
  );

  return {
    data,
    isLoading,
    isError,
  };
}