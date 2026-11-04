import { api } from "../api/api";

export interface AppVersionResponse {
  id: number;
  version: string;
  commitHash: string;
  branch: string;
  publishedAt: string;
}

export const appVersionService = {
  getByVersion: async (version: string): Promise<AppVersionResponse> => {
    const response = await api.get<AppVersionResponse>(
      `/app-versions/${version}`,
    );

    return response.data;
  },
};