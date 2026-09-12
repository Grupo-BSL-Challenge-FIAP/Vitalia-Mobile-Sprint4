import { Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS } from "../../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { ButtonLinkType } from "../../types/ButtonLinkType";

export default function ButtonLink({
  route,
  paddingVertical,
  paddingHorizontal,
  alignItems,
  borderRadius,
  backgroundColor,
  fontFamily,
  fontSize,
  colorText,
  borderWidth,
  borderColor,
  children,
  iconLeft,
  iconRight,
  gapTextIcon
}: ButtonLinkType) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(route)}
      style={{
        backgroundColor: backgroundColor || COLORS.orange[900],
        paddingVertical: paddingVertical || 11,
        paddingHorizontal: paddingHorizontal || 0,
        alignItems: alignItems || "center",
        borderRadius: borderRadius || 15,
        borderWidth: borderWidth || 3,
        borderColor: borderColor || COLORS.orange[900],
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {iconLeft}
      <Text
        style={{
          color: colorText || COLORS.orange[100],
          fontFamily: fontFamily || FONTS.poppins[700],
          fontSize: fontSize || 22,
          marginLeft: iconLeft ? 15 : 0,
          marginRight: iconRight ? 15 : 0,
        }}
      >
        {children}
      </Text>
        {iconRight}
    </TouchableOpacity>
  );
}
