import { useQuery } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { alertService } from "../services/alertService";

export function useAlerts() {
  return useQuery({
    queryKey: ["alerts"],

    queryFn: async () => {
      const activePetId = await AsyncStorage.getItem(
        "@petguardian:activePetId"
      );

      if (!activePetId) {
        return [];
      }

      return alertService.getByPetId(Number(activePetId));
    },

    staleTime: 30 * 1000,
  });
}