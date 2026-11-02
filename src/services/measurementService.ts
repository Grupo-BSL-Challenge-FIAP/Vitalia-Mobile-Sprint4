import { api } from "../api/api";

export interface MeasurementDetailResponse {
  id: number;
  petId: number;
  activityLevel: number;
  sleepHours: number;
  heartRate: number;
  respiratoryRate: number;
  temperature: number;
  behaviorScore: number;
  measurementDate: string;
}

export const measurementService = {
  getLatestByPetId: async (petId: number): Promise<MeasurementDetailResponse> => {
    const response = await api.get<MeasurementDetailResponse>(
      `/api/measurements/pet/${petId}/latest`,
    );

    return response.data;
  },
};