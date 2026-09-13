import { Text, TouchableOpacity } from "react-native";
import { COLORS, FONTS } from "../../styles/styles";
import { CardActionPetType } from "../../types/CardActionPetType";

export default function CardActionPet({
  onPress,
  icon,
  text,
  background,
  borderColor,
  colorText,
}: CardActionPetType) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 120,
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: background || COLORS.white[400],
        borderWidth: 2,
        borderColor: borderColor || COLORS.orange[900],
        borderRadius: 10,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 27,
      }}
    >
      {icon}
      <Text
        style={{
          color: colorText || COLORS.orange[900],
          fontFamily: FONTS.inter[700],
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}