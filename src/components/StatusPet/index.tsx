import { Image, Text, View } from "react-native";
import TitleOrange from "../TitleOrange";
import { COLORS, FONTS } from "../../styles/styles";
import ContainerTitleSubTitle from "../ContainerTitleSubTitle";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import CardStatus from "../CardStatus";
import ContainerStatus from "../ContainerStatus";
import ButtonLink from "../ButtonLink";

export default function StatusPet() {
  return (
    <View
      style={{
        gap: 10,
      }}
    >
      <TitleOrange title="Status" fontFamily={FONTS.inter[700]} fontSize={24} />

      <ContainerStatus>
        <CardStatus>
          <View
            style={{
              alignItems: "flex-end",
            }}
          >
            <Image source={require("../../assets/iconSleep.png")} />
          </View>
          <View>
            <ContainerTitleSubTitle
              alignItems="flex-start"
              textTitle="Boa"
              fontFamilyTitle={FONTS.inter[700]}
              fontSizeTiTleOrange={24}
              colorTitleOrange={COLORS.orange[700]}
              marginLeftTitleOrange={20}
              textSubTitle="Qualidade do Sono"
              fontSizeSubTitle={14}
              fontFamilySubTitle={FONTS.inter[500]}
              gap={20}
            />
          </View>
        </CardStatus>
        <CardStatus>
          <View
            style={{
              alignItems: "flex-end",
            }}
          >
            <FontAwesome6 name="heart-pulse" size={50} color="black" />
          </View>
          <View>
            <ContainerTitleSubTitle
              alignItems="flex-start"
              textTitle="140 Bpm"
              fontFamilyTitle={FONTS.inter[700]}
              fontSizeTiTleOrange={24}
              colorTitleOrange={COLORS.orange[700]}
              textSubTitle="Frequência cardíaca"
              fontSizeSubTitle={14}
              fontFamilySubTitle={FONTS.inter[500]}
              gap={20}
            />
          </View>
        </CardStatus>
        <CardStatus paddingRight={10} paddingBottom={30} isIconRoute={true}>
          <View>
            <TitleOrange
              title="Ver localização do pet"
              fontSize={13}
              color={COLORS.orange[700]}
              fontFamily={FONTS.inter[700]}
              textAlign="center"
            />
          </View>
          <View
            style={{
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Image source={require("../../assets/iconMap.png")} />
          </View>
        </CardStatus>
        <CardStatus paddingRight={10} paddingBottom={30} isIconRoute={true}>
          <View>
            <TitleOrange
              title="Consultas para o pet"
              fontSize={13}
              color={COLORS.orange[700]}
              fontFamily={FONTS.inter[700]}
              textAlign="center"
            />
          </View>
          <View
            style={{
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <FontAwesome name="calendar-check-o" size={50} color="black" />
          </View>
        </CardStatus>
        <View style={{ width: "100%" }}>
            <ButtonLink
                route="PetsScreen"
                fontSize={15}
                backgroundColor={COLORS.orange[700]}
                borderWidth={2}
                fontFamily={FONTS.inter[700]}
            >
                Ver mais detalhes na página do pet
            </ButtonLink>
        </View>
      </ContainerStatus>
    </View>
  );
}
