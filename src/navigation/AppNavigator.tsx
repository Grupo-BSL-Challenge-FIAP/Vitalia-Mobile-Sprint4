import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeLoginCadastroScreen from "../screens/HomeLoginCadastroScreen";
import LoginScreen from "../screens/LoginScreen";
import PetRegisterScreen from "../screens/PetRegisterScreen";
import ResponsibleRegisterScreen from "../screens/ResponsibleRegisterScreen";
import AccountCreationConfirmationScreen from "../screens/AccountCreationConfirmationScreen";
import DashboardResponsibleScreen from "../screens/DashboardResponsibleScreen";
import AuthenticationCodeScreen from "../screens/AuthenticationCodeScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import PetsScreen from "../screens/PetsScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import TabNavigator from "./TabNavigator";

export type RootStackParamList = {
  HomeLoginCadastroScreen: undefined;
  LoginScreen: undefined;
  ResponsibleRegisterScreen: undefined;
  PetRegisterScreen: undefined;
  AccountCreationConfirmationScreen: undefined;
  DashboardResponsibleScreen: undefined;
  AuthenticationCodeScreen: undefined;
  ForgotPasswordScreen: undefined;
  ResetPasswordScreen: undefined;
  PetsScreen: undefined;
  NotificationsScreen: undefined;
  ProfileResponsibleScreen: undefined;
  PageUnderDevelopmentScreen: undefined;
  TabsDashboardResponsible: undefined;
  TabsPet: undefined;
  TabsNotification: undefined;
  TabsProfileScreen: undefined;
  Início: undefined;
  Pets: undefined;
  Notificações: undefined;
  Perfil: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="HomeLoginCadastroScreen">
      <Stack.Screen
        name="HomeLoginCadastroScreen"
        component={HomeLoginCadastroScreen}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />

      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />

      <Stack.Screen
        name="ResponsibleRegisterScreen"
        component={ResponsibleRegisterScreen}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />

      <Stack.Screen
        name="PetRegisterScreen"
        component={PetRegisterScreen}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />

      <Stack.Screen
        name="AccountCreationConfirmationScreen"
        component={AccountCreationConfirmationScreen}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />

      <Stack.Screen
        name="TabsDashboardResponsible"
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AuthenticationCodeScreen"
        component={AuthenticationCodeScreen}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />

      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />

      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />

      <Stack.Screen
        name="TabsPet"
        component={TabNavigator}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />

      <Stack.Screen
        name="TabsNotification"
        component={TabNavigator}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />

      <Stack.Screen
        name="TabsProfileScreen"
        component={TabNavigator}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />

      <Stack.Screen
        name="PageUnderDevelopmentScreen"
        component={TabNavigator}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
}