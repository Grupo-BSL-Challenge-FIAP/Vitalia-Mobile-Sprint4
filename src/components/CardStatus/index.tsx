import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { COLORS } from "../../styles/styles";
import { CardStatusType } from "../../types/CardStatusType";

export default function CardStatus({
  background,
  width,
  paddingLeft,
  paddingBottom,
  paddingTop,
  paddingRight,
  borderWidth,
  borderColor,
  borderRadius,
  children,
  isIconRoute,
  onPress,
}: CardStatusType) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: background || COLORS.orange[100],
        width: width || "47%",
        paddingLeft: paddingLeft || 15,
        paddingBottom: paddingBottom || 18,
        paddingTop: paddingTop || 14,
        paddingRight: paddingRight || 14,
        borderWidth: borderWidth || 1,
        borderColor: borderColor || COLORS.orange[200],
        borderRadius: borderRadius || 10,
      }}
    >
      {children}
      {isIconRoute && (
        <View
          style={{
            position: "absolute",
            bottom: 5,
            right: 10
          }}
        >
          <Ionicons name="open-outline" size={24} color="black" />
        </View>
      )}
    </Pressable>
  );
}
