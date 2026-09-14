import { useMutation } from "@tanstack/react-query";
import { userService } from "../services/userService";

export function useDeleteCurrentUser() {
  return useMutation({
    mutationFn: () =>
      userService.deleteMe(),
  });
}