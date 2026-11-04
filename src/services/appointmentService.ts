import { api } from "../api/api";

export interface AppointmentResponse {
  id: number;
  appointmentDate: string;
  status: "SCHEDULED" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  notes: string;
  appointmentType: string | null;
  location: string | null;
  petId: number;
  veterinarianId: number;
  veterinarianName: string;
}

export interface AppointmentUpdateRequest {
  appointmentDate: string;
  status: AppointmentResponse["status"];
  notes: string;
  appointmentType: string | null;
  location: string | null;
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

  getById: async (appointmentId: number): Promise<AppointmentResponse> => {
    const response = await api.get<AppointmentResponse>(
      `/appointments/${appointmentId}`,
    );

    return response.data;
  },

  update: async (
    appointmentId: number,
    request: AppointmentUpdateRequest,
  ): Promise<AppointmentResponse> => {
    const response = await api.put<AppointmentResponse>(
      `/appointments/${appointmentId}`,
      request,
    );

    return response.data;
  },

  confirmById: async (appointmentId: number): Promise<AppointmentResponse> => {
  const response = await api.patch<AppointmentResponse>(
    `/appointments/${appointmentId}/confirm`,
  );

  return response.data;
},

  deleteById: async (appointmentId: number): Promise<void> => {
    await api.delete(`/appointments/${appointmentId}`);
  },
};
