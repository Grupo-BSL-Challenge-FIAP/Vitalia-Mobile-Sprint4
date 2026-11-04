import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPetsScreen from "../screens/AllPetsScreen";
import PetsDetailScreen from "../screens/PetsDetailScreen";
import PetHistoryScreen from "../screens/PetHistoryScreen";
import DashboardResponsibleScreen from "../screens/DashboardResponsibleScreen";

export type HomeStackParamList = {
  DashboardResponsibleScreen: undefined;
  AllPetsScreen: undefined;
  PetDetailScreen: { petId: number; };
  PetHistoryScreen: { petId: number; };
};

const Stack = createNativeStackNavigator<HomeStackParamList,"HomeStack">();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator
      id="HomeStack"
      initialRouteName="DashboardResponsibleScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="DashboardResponsibleScreen"
        component={DashboardResponsibleScreen}
      />

      <Stack.Screen
        name="AllPetsScreen"
        component={AllPetsScreen}
      />

      <Stack.Screen
        name="PetDetailScreen"
        component={PetsDetailScreen}
      />

      <Stack.Screen
        name="PetHistoryScreen"
        component={PetHistoryScreen}
      />
    </Stack.Navigator>
  );
}