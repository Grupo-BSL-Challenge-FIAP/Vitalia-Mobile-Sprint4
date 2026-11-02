import { Text, View } from "react-native";
import { COLORS, FONTS } from "../../styles/styles";
import { BpmCircleType } from "../../types/BpmCircleType";

export default function BpmCircle({ bpm, status }: BpmCircleType) {
  const getStatusColor = () => {
    if (status === "RISK") {
      return COLORS.red[500];
    }

    if (status === "ATTENTION") {
      return "#F2C94C";
    }

    return COLORS.green[100];
  };

  return (
    <View
      style={{
        width: 60,
        height: 60,
        borderColor: getStatusColor(),
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
        {bpm ?? '--'}
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
