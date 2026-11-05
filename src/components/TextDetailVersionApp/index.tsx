import { Text, View } from "react-native";
import { COLORS, FONTS } from "../../styles/styles";
import { TextDetailVersionAppType } from "../../types/TextDetailVersionAppType";
import { useTheme } from "../../contexts/ThemeContext";

export default function TextDetailVersionApp({
  icon,
  title,
  response,
}: TextDetailVersionAppType) {
  const { isDarkMode } = useTheme();

  const textColor = isDarkMode
    ? COLORS.white[100]
    : COLORS.orange[900];

  const borderColor = isDarkMode
    ? COLORS.white[100]
    : COLORS.orange[950];

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        paddingBottom: 13,
        borderColor: borderColor,
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
            color: textColor,
          }}
        >
          {title}
        </Text>
      </View>

      <Text
        style={{
          fontFamily: FONTS.inter[600],
          fontSize: 12,
          color: textColor,
        }}
      >
        {response}
      </Text>
    </View>
  );
}
