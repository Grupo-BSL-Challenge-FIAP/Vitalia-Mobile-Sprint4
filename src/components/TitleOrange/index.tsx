import { Text } from "react-native";
import { COLORS, FONTS } from "../../styles/styles";
import { TitleOrangeType } from "../../types/TitleOrangeType";

export default function TitleOrange({ title, fontSize, textAlign, fontFamily, marginLeft, color }: TitleOrangeType) {
  return (
    <Text
      style={{
        color: color || COLORS.orange[900],
        fontFamily: fontFamily || FONTS.poppins[700],
        fontSize: fontSize || 32,
        textAlign: textAlign || "left",
        marginLeft: marginLeft || 0
      }}
    >
      {title}
    </Text>
  );
}
