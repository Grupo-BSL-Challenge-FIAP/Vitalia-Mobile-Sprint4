
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScheduleAppointment from "../screens/ScheduleAppointment";
import ConsultationsScreen from "../screens/ConsultationsScreen";
import ConsultatiionsDetailsScreen from "../screens/ConsultationsDetailsScreen";

export type AppointmentStatus =
  | "SCHEDULED"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED";

export type AppointmentStatusLabel =
  | "Pendente"
  | "Confirmada"
  | "Cancelada"
  | "Concluída";

export type ConsultationStackParamList = {
  ConsultationsHome: undefined;
  ScheduleAppointment: undefined;
  ConsultatiionsDetailsScreen: {
    appointmentId: number;
    petId: number;
    status: AppointmentStatusLabel;
  };
};

const Stack = createNativeStackNavigator<
  ConsultationStackParamList,
  "ConsultationStack"
>();

export default function ConsultationStackNavigator() {
  return (
    <Stack.Navigator
      id="ConsultationStack"
      initialRouteName="ConsultationsHome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="ConsultationsHome"
        component={ConsultationsScreen}
      />

      <Stack.Screen
        name="ScheduleAppointment"
        component={ScheduleAppointment}
      />

      <Stack.Screen
        name="ConsultatiionsDetailsScreen"
        component={ConsultatiionsDetailsScreen}
      />
    </Stack.Navigator>
  );
}