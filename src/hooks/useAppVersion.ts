import { useQuery } from "@tanstack/react-query";
import { appVersionService } from "../services/appVersionService";

export function useAppVersion(version: string) {
  return useQuery({
    queryKey: ["app-version", version],
    queryFn: () => appVersionService.getByVersion(version),
    enabled: !!version,
    staleTime: 5 * 60 * 1000,
  });
}