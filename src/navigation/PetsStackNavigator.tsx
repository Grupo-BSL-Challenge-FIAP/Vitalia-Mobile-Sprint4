import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPetsScreen from "../screens/AllPetsScreen";
import PetsDetailScreen from "../screens/PetsDetailScreen";

export type PetsStackParamList = {
  AllPetsScreen: undefined;
  PetDetailScreen: { petId: number; };
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
    </Stack.Navigator>
  );
}