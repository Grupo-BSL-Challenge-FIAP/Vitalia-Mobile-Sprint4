import { View } from "react-native";
import TitleOrange from "../TitleOrange";
import { COLORS, FONTS } from "../../styles/styles";
import Cardinsight from "../CardInsight";
import TextLink from "../TextLink";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function ContainerInsights() {
  return (
    <View>
      <TitleOrange
        title="Insights"
        fontFamily={FONTS.inter[700]}
        fontSize={24}
      />

      <View
        style={{
          marginTop: 15,
          gap: 30,
        }}
      >
        <Cardinsight text="Seu pet fica mais ansioso quando você fica longe dele." />
        <Cardinsight text="Seu pet não está tão ativo comparado a ontem, aconteceu algo?" />
      </View>

      <View
        style={{
            alignItems:"center",
            marginTop: 57,
            paddingBottom: 50
        }}
      >
        <TextLink
          route="NotificationsScreen"
          textLink="Ver histórico de insights"
          fontFamily={FONTS.inter[700]}
          fontSize={20}
          gap={8}
          opacity={0.70}
          iconRight={<AntDesign name="arrow-right" size={15} color={COLORS.orange[900]} />}
        />
      </View>
    </View>
  );
}
