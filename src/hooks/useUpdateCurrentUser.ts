import {
  useMutation,
} from "@tanstack/react-query";

import {
  UpdateCurrentUserRequest,
  userService,
} from "../services/userService";

import { queryClient } from "../api/queryClient";

export function useUpdateCurrentUser() {
  return useMutation({
    mutationFn: (
      data: UpdateCurrentUserRequest,
    ) =>
      userService.updateMe(data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          "current-user",
        ],
      });
    },
  });
}