import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountUserScreen from "../screens/AccountUserScreen";
import AboutApplicationScreen from "../screens/AboutApplicationScreen";

export type ProfileStackParamList = {
  AccountUserScreen: undefined;
  AboutApplicationScreen: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList,"ProfileStack">();

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator
      id="ProfileStack"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="AccountUserScreen"
        component={AccountUserScreen}
      />

      <Stack.Screen
        name="AboutApplicationScreen"
        component={AboutApplicationScreen}
      />
    </Stack.Navigator>
  );
}