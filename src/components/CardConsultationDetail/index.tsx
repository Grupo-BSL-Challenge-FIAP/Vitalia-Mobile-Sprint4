import { View } from "react-native";
import TitleOrange from "../TitleOrange";
import { COLORS, FONTS } from "../../styles/styles";
import { CardConsultationDetailType } from "../../types/CardConsultationDetailType";

export function CardConsultationDetail({
  title,  
  flexDirection,  
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingVertical,
  paddingHorizontal,
  gap,
  alignItems,
  children,
}: CardConsultationDetailType) {
  return (
    <View
        style={{
            gap: 8
        }}
    >
      <TitleOrange
        title={title}
        fontFamily={FONTS.inter[500]}
        fontSize={14}
        color={COLORS.gray[400]}
      />

      <View
        style={{
          flexDirection: flexDirection || 'row',
          alignItems: alignItems || 'center',
          paddingTop: paddingTop,
          paddingBottom: paddingBottom,
          paddingLeft: paddingLeft,
          paddingVertical: paddingVertical,
          paddingHorizontal: paddingHorizontal,
          gap: gap,
          borderWidth: 1,
          borderRadius: 14,
          borderColor: COLORS.gray[500],
        }}
      >
        {children}
      </View>
    </View>
  );
}
