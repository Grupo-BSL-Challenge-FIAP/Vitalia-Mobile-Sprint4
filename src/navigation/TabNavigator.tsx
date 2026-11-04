import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "./AppNavigator";
import { COLORS, FONTS } from "../styles/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";
import NotificationsScreen from "../screens/NotificationsScreen";
import ProfileStackNavigator from "./ProfileStackNavigator";
import ConsultationsScreen from "../screens/ConsultationsScreen";
import HomeStackNavigator from "./HomeStackNavigator";

const Tab = createBottomTabNavigator<RootStackParamList, "MainTabs">();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      id="MainTabs"
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          position: "absolute",
          backgroundColor: COLORS.orange[900],
          height: 105,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderTopWidth: 0,
          paddingTop: 10,
          paddingBottom: 10,
          paddingHorizontal: 22,
        },

        tabBarItemStyle: {
          paddingTop: 20,
        },

        tabBarActiveTintColor: COLORS.white[100],
        tabBarInactiveTintColor: COLORS.white[100],

        tabBarLabelStyle: {
          fontFamily: FONTS.inter[500],
          fontSize: 13,
        },
      }}
    >
      <Tab.Screen
        name="Início"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? COLORS.orange[700] : "transparent",

                width: 50,
                height: 50,
                borderRadius: 25,

                justifyContent: "center",
                alignItems: "center",

                marginTop: 1,
                marginBottom: 25,
              }}
            >
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={26}
                color="white"
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Consultas"
        component={ConsultationsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? COLORS.orange[700] : "transparent",

                width: 50,
                height: 50,
                borderRadius: 25,

                justifyContent: "center",
                alignItems: "center",

                marginTop: 1,
                marginBottom: 25,
              }}
            >
              <Ionicons
                name={focused ? "calendar" : "calendar-outline"}
                size={26}
                color="white"
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Notificações"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? COLORS.orange[700] : "transparent",

                width: 50,
                height: 50,
                borderRadius: 25,

                justifyContent: "center",
                alignItems: "center",

                marginTop: 1,
                marginBottom: 25,
              }}
            >
              <Ionicons
                name={focused ? "notifications" : "notifications-outline"}
                size={26}
                color="white"
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? COLORS.orange[700] : "transparent",

                width: 50,
                height: 50,
                borderRadius: 25,

                justifyContent: "center",
                alignItems: "center",

                marginTop: 1,
                marginBottom: 25,
              }}
            >
              <Ionicons
                name={focused ? "person-circle" : "person-circle-outline"}
                size={26}
                color="white"
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
