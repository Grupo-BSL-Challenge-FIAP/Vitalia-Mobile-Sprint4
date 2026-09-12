import { Pressable, Text } from "react-native";
import { COLORS, FONTS } from "../../styles/styles";
import { ButtonFormLinkType } from "../../types/ButtonFormLinkType";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

export default function ButtonFormLink({
  onPress,
  paddingVertical,
  marginHorizontal,
  marginTop,
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
}: ButtonFormLinkType) {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: backgroundColor || COLORS.orange[900],
        paddingVertical: paddingVertical || 11,
        marginHorizontal: marginHorizontal || 0,
        marginTop: marginTop || 0,
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
    </Pressable>
  );
}
