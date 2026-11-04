import { Text, View } from "react-native";
import { COLORS, FONTS } from "../../styles/styles";
import { TextDetailVersionAppType } from "../../types/TextDetailVersionAppType";

export default function TextDetailVersionApp({ icon, title, response}: TextDetailVersionAppType) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        paddingBottom: 13,
        borderColor: COLORS.orange[950],
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 15,
        }}
      >
        {icon}
        <Text
          style={{
            fontFamily: FONTS.inter[400],
            fontSize: 12,
            color: COLORS.orange[900],
          }}
        >
          {title}
        </Text>
      </View>
      <Text
        style={{
          fontFamily: FONTS.inter[600],
          fontSize: 12,
          color: COLORS.orange[900],
        }}
      >
        {response}
      </Text>
    </View>
  );
}
