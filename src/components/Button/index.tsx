import { Text, TouchableOpacity } from "react-native";
import { COLORS, FONTS } from "../../styles/styles";
import { ButtonType } from "../../types/ButtonType";

export default function Button({
    onPress,
    paddingVertical,
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
}: ButtonType) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: backgroundColor || COLORS.orange[900],
        paddingVertical: paddingVertical || 11,
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
