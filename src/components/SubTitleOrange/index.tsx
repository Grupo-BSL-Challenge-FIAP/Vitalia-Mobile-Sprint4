
import { Text } from "react-native";
import { COLORS, FONTS } from "../../styles/styles";
import { SubTitleOrangeType } from "../../types/SubTitleOrangeType";
import { useTheme } from "../../contexts/ThemeContext";

export default function SubTitleOrange({
  title,
  fontSize,
  fontFamily,
  textAlign,
  color,
}: SubTitleOrangeType) {
  const { isDarkMode } = useTheme();

  return (
    <Text
      style={{
        color: isDarkMode
          ? COLORS.white[100]
          : color || COLORS.orange[700],
        fontFamily: fontFamily || FONTS.poppins[700],
        fontSize: fontSize || 20,
        textAlign: textAlign || "left",
      }}
    >
      {title}
    </Text>
  );
}
