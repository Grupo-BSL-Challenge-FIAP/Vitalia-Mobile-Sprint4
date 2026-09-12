import { Text, View } from "react-native";
import { COLORS, FONTS } from "../../styles/styles";

export default function Cardinsight({text} : {text: string}) {
  return (
    <View
      style={{
        backgroundColor: COLORS.orange[100],
        borderWidth: 2,
        borderColor: COLORS.orange[700],
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: FONTS.inter[600],
          color: COLORS.orange[900]
        }}
      >
        {text}
      </Text>
    </View>
  );
}
