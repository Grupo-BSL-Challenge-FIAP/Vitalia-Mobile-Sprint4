import { View } from "react-native";
import { COLORS } from "../../styles/styles";
import { CardPetType } from "../../types/CardPetType";

export default function CardPet({
  backgroundColor,
  paddingVertical,
  paddingHorizontal,
  borderTopWidth,
  borderBottomWidth,
  borderColor,
  borderRadius,
  marginTop,
  marginBottom,
  flexDirection,
  gap,
  children
}: CardPetType) {
  return (
    <View
      style={{
        backgroundColor: backgroundColor || COLORS.orange[700],
        paddingVertical: paddingVertical || 13,
        paddingHorizontal: paddingHorizontal || 15,
        borderTopWidth: borderTopWidth || 3,
        borderBottomWidth: borderBottomWidth || 3,
        borderColor: borderColor || COLORS.orange[900],
        borderRadius: borderRadius || 10,
        marginTop: marginTop,
        marginBottom: marginBottom,
        flexDirection: flexDirection || "row",
        gap: gap || 20,
      }}
    >
      {children}
    </View>
  );
}
