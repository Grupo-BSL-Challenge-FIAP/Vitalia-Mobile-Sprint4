import { api } from "../api/api";

export interface AppointmentResponse {
  id: number;
  appointmentDate: string;
  status: string;
  notes: string | null;
  petId: number;
  veterinarianId: number;
}

export const appointmentService = {
  getByPetId: async (petId: number): Promise<AppointmentResponse[]> => {
    const response = await api.get<AppointmentResponse[]>(
      `/appointments/pet/${petId}`,
    );

    return response.data;
  },
};