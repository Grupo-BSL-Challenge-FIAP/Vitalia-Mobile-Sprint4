import { View } from "react-native";
import { COLORS, FONTS } from "../../styles/styles";
import TitleOrange from "../TitleOrange";
import SubTitleOrange from "../SubTitleOrange";
import { CardNumberType } from "../../types/CardNumberType";

export default function CardNumber({title, subTitle}: CardNumberType) {
  return (
    <View
      style={{
        width: 184,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        borderWidth: 2,
        borderColor: COLORS.orange[960],
        borderRadius: 5,
      }}
    >
      <TitleOrange title={title} fontFamily={FONTS.inter[600]} fontSize={40} />
      <SubTitleOrange
        title={subTitle}
        fontFamily={FONTS.inter[600]}
        fontSize={16}
        color={COLORS.orange[970]}
      />
    </View>
  );
}
