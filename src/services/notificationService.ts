import { Platform } from "react-native";
import * as Notifications from "expo-notifications";

const APPOINTMENT_CHANNEL_ID = "appointment-updates";

export async function requestNotificationPermission(): Promise<boolean> {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync(APPOINTMENT_CHANNEL_ID, {
      name: "Atualizações de consultas",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#F28C28",
    });
  }

  let permissionResponse = await Notifications.getPermissionsAsync();

  const hasPermission =
    permissionResponse.granted ||
    permissionResponse.ios?.status ===
      Notifications.IosAuthorizationStatus.PROVISIONAL;

  if (hasPermission) {
    return true;
  }

  permissionResponse = await Notifications.requestPermissionsAsync();

  return (
    permissionResponse.granted ||
    permissionResponse.ios?.status ===
      Notifications.IosAuthorizationStatus.PROVISIONAL
  );
}

export async function sendAppointmentConfirmedNotification(
  petName: string,
  appointmentTitle: string,
): Promise<void> {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Consulta confirmada",
      body: `A consulta "${appointmentTitle}" de ${petName} foi confirmada com sucesso.`,
      sound: true,
      data: {
        type: "APPOINTMENT_CONFIRMED",
      },
    },
    trigger:
      Platform.OS === "android" ? { channelId: APPOINTMENT_CHANNEL_ID } : null,
  });
}
