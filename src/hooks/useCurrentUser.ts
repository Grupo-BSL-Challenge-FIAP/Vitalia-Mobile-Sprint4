import { useQuery } from "@tanstack/react-query";

import { authService } from "../services/authService";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: authService.me,
  });
}