import { View } from "react-native";
import TitleOrange from "../TitleOrange";
import { COLORS, FONTS } from "../../styles/styles";
import Cardinsight from "../CardInsight";
import TextLink from "../TextLink";
import AntDesign from "@expo/vector-icons/AntDesign";

interface ContainerInsightsProps {
  insights?: string[];
  isLoading?: boolean;
}

export default function ContainerInsights({
  insights = [],
  isLoading = false,
}: ContainerInsightsProps) {
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
        {isLoading && (
          <Cardinsight text="Carregando insights..." />
        )}

        {!isLoading && insights.length === 0 && (
          <Cardinsight text="Nenhum insight disponível para este pet." />
        )}

        {!isLoading &&
          insights.map((insight, index) => (
            <Cardinsight
              key={`${insight}-${index}`}
              text={insight}
            />
          ))}
      </View>

      <View
        style={{
          alignItems:"center",
          marginTop: 57,
          paddingBottom: 50
        }}
      >
        <TextLink
          route="Notificações"
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
