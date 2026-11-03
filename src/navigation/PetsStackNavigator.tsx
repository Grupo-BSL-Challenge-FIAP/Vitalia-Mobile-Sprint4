import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPetsScreen from "../screens/AllPetsScreen";
import PetsDetailScreen from "../screens/PetsDetailScreen";
import PetHistoryScreen from "../screens/PetHistoryScreen";

export type PetsStackParamList = {
  AllPetsScreen: undefined;
  PetDetailScreen: { petId: number; };
  PetHistoryScreen: { petId: number; };
};

const Stack = createNativeStackNavigator<PetsStackParamList,"PetsStack">();

export default function PetsStackNavigator() {
  return (
    <Stack.Navigator
      id="PetsStack"
      screenOptions={{
        headerShown: false,
      }}
    >
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