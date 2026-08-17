import { Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS } from "../../styles/styles";
import { HeaderType } from "../../types/HeaderType";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

export default function Header({
  children,
  textHeader,
  isBackBottom = true,
}: HeaderType) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View
      style={{
        backgroundColor: COLORS.orange[900],
        width: "100%",
        padding: 18,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: isBackBottom ? "space-between" : "center",
      }}
    >
      {isBackBottom && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle-outline" size={43} color="white" />
        </TouchableOpacity>
      )}
      <Text
        style={{
          color: COLORS.white[100],
          fontFamily: FONTS.inter[700],
          fontSize: 24,
          marginLeft: -10,
        }}
      >
        {textHeader}
      </Text>
      <Text></Text>
      {children}
    </View>
  );
}
