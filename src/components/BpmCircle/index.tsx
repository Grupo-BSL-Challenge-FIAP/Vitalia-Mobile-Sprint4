import { Text, View } from "react-native";
import { COLORS, FONTS } from "../../styles/styles";

export default function BpmCircle() {
  return (
    <View
      style={{
        width: 60,
        height: 60,
        borderColor: COLORS.green[100],
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderRadius: 100,
      }}
    >
      <Text
        style={{
          fontFamily: FONTS.inter[700],
          fontSize: 12,
          color: COLORS.orange[700],
        }}
      >
        140
      </Text>
      <Text
        style={{
          fontFamily: FONTS.inter[700],
          fontSize: 12,
          color: COLORS.orange[700],
        }}
      >
        Bpm
      </Text>
    </View>
  );
}
