import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScheduleAppointment from "../screens/ScheduleAppointment";
import ConsultationsScreen from "../screens/ConsultationsScreen";

export type ConsultationStackParamList = {
  Consultas: undefined;
  ScheduleAppointment: undefined;
};

const Stack = createNativeStackNavigator<ConsultationStackParamList,"ConsultationStack">();

export default function ConsultationStackNavigator() {
  return (
    <Stack.Navigator
      id="ConsultationStack"
      initialRouteName="Consultas"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Consultas"
        component={ConsultationsScreen}
      />

      <Stack.Screen
        name="ScheduleAppointment"
        component={ScheduleAppointment}
      />
    </Stack.Navigator>
  );
}