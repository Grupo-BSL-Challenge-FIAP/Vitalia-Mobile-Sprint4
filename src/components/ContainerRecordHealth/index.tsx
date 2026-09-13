import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../styles/styles";
import CardStatus from "../CardStatus";
import ContainerStatus from "../ContainerStatus";
import TitleOrange from "../TitleOrange";
import { Text, View } from "react-native";
import ContainerTitleSubTitle from "../ContainerTitleSubTitle";

export default function ContainerRecordHealth() {
  return (
    <>
      <TitleOrange
        title="Registro de saúde"
        fontFamily={FONTS.inter[700]}
        fontSize={24}
      />
      <ContainerStatus>
        <CardStatus>
          <View
            style={{
              alignItems: "center",
              gap: 16,
            }}
          >
            <FontAwesome6 name="heart-pulse" size={40} color="black" />
            <ContainerTitleSubTitle
              alignItems="center"
              textTitle="140 Bpm"
              fontFamilyTitle={FONTS.inter[700]}
              fontSizeTiTleOrange={24}
              colorTitleOrange={COLORS.orange[700]}
              textSubTitle="Frequência cardíaca"
              fontSizeSubTitle={14}
              fontFamilySubTitle={FONTS.inter[500]}
              gap={15}
            />
          </View>
        </CardStatus>

        <CardStatus>
          <View
            style={{
              alignItems: "center",
              gap: 16,
            }}
          >
            <FontAwesome5 name="moon" size={40} color="black" />
            <ContainerTitleSubTitle
              alignItems="center"
              textTitle="Boa"
              fontFamilyTitle={FONTS.inter[700]}
              fontSizeTiTleOrange={24}
              colorTitleOrange={COLORS.orange[700]}
              textSubTitle="Qualidade do Sono"
              fontSizeSubTitle={14}
              fontFamilySubTitle={FONTS.inter[500]}
              gap={15}
            />
          </View>
        </CardStatus>

        <CardStatus>
          <View
            style={{
              alignItems: "center",
              gap: 16,
            }}
          >
            <FontAwesome6 name="calendar-check" size={40} color="black" />
            <ContainerTitleSubTitle
              alignItems="center"
              textTitle="13 de outubro"
              fontFamilyTitle={FONTS.inter[700]}
              fontSizeTiTleOrange={20}
              colorTitleOrange={COLORS.orange[700]}
              textSubTitle="Próxima consulta"
              fontSizeSubTitle={14}
              fontFamilySubTitle={FONTS.inter[500]}
              gap={15}
            />
          </View>
        </CardStatus>

        <CardStatus>
          <View
            style={{
              alignItems: "center",
              gap: 16,
            }}
          >
            <FontAwesome6 name="temperature-low" size={40} color="black" />
            <ContainerTitleSubTitle
              alignItems="center"
              textTitle="38,5°C"
              fontFamilyTitle={FONTS.inter[700]}
              fontSizeTiTleOrange={20}
              colorTitleOrange={COLORS.orange[700]}
              textSubTitle="Temperatura"
              fontSizeSubTitle={14}
              fontFamilySubTitle={FONTS.inter[500]}
              gap={15}
            />
          </View>
        </CardStatus>

      </ContainerStatus>
    </>
  );
}
