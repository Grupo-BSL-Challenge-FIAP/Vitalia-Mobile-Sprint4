import { View } from "react-native";
import { COLORS, FONTS } from "../../styles/styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import TitleOrange from "../TitleOrange";
import SubTitleOrange from "../SubTitleOrange";
import { CardConsultationInformationDetailsType } from "../../types/CardConsultationInformationDetailsType";

export default function CardConsultationInformationDetails({
  icon,
  title,
  subTitle,
}: CardConsultationInformationDetailsType) {
  return (
    <View
      style={{
        width: 166,
        paddingTop: 10,
        paddingBottom: 12,
        backgroundColor: COLORS.orange[920],
        alignItems: "center",
        borderRadius: 14,
        gap: 5,
      }}
    >
        {icon}
      <TitleOrange
        title={title}
        fontFamily={FONTS.inter[500]}
        fontSize={15}
      />
      <SubTitleOrange
        title={subTitle}
        color={COLORS.gray[400]}
        fontFamily={FONTS.inter[400]}
        fontSize={14}
      />
    </View>
  );
}
