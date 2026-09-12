import { Text } from "react-native";
import { COLORS, FONTS } from "../../styles/styles";
import { SubTitleOrangeType } from "../../types/SubTitleOrangeType";

export default function SubTitleOrange({ title, fontSize, fontFamily, textAlign, color }: SubTitleOrangeType) {
  return (
    <Text
      style={{
        color: color || COLORS.orange[700],
        fontFamily: fontFamily || FONTS.poppins[700],
        fontSize: fontSize || 20,
        textAlign: textAlign || "left",
      }}
    >
      {title}
    </Text>
  );
}
