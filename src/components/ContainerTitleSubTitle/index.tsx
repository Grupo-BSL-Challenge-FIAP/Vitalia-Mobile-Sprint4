import { View } from "react-native";
import TitleOrange from "../TitleOrange";
import SubTitleOrange from "../SubTitleOrange";
import { FONTS } from "../../styles/styles";
import { ContainerTitleSubTitleType } from "../../types/ContainerTitleSubTitleType";

export default function ContainerTitleSubTitle({
  alignItems,
  textTitle,
  textSubTitle,
  fontSizeTiTleOrange,
  fontSizeSubTitle,
  fontFamilyTitle,
  fontFamilySubTitle,
  marginBottom,
  marginLeftTitleOrange,
  colorTitleOrange,
  marginTop,
  marginVertical,
  flexDirection,
  gap,
  flewWrap,
}: ContainerTitleSubTitleType) {
  return (
    <View
      style={{
        alignItems: alignItems || "center",
        flexDirection: flexDirection || "column",
        marginBottom: marginBottom || 0,
        marginTop: marginTop || 0,
        marginVertical: marginVertical || 0,
        gap: gap,
        flexWrap: flewWrap,
      }}
    >
      <TitleOrange
        title={textTitle}
        textAlign="center"
        fontSize={fontSizeTiTleOrange}
        fontFamily={fontFamilyTitle}
        marginLeft={marginLeftTitleOrange}
        color={colorTitleOrange}
      />
      <SubTitleOrange
        title={textSubTitle}
        fontFamily={fontFamilySubTitle || FONTS.poppins[600]}
        fontSize={fontSizeSubTitle}
        textAlign="center"
      />
    </View>
  );
}
