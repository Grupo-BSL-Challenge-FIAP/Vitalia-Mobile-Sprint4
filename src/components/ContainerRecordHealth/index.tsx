import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../styles/styles";
import CardStatus from "../CardStatus";
import ContainerStatus from "../ContainerStatus";
import TitleOrange from "../TitleOrange";
import { View } from "react-native";
import ContainerTitleSubTitle from "../ContainerTitleSubTitle";
import { useLatestMeasurement } from "../../hooks/useLatestMeasurement";

interface ContainerRecordHealthProps {
  petId: number;
}

export default function ContainerRecordHealth({
  petId,
}: ContainerRecordHealthProps) {
  const { data: measurement, isLoading } = useLatestMeasurement(petId);

  const getSleepQuality = (sleepHours?: number) => {
    if (sleepHours === undefined) return "--";

    if (sleepHours >= 10) return "Boa";
    if (sleepHours >= 8) return "Regular";

    return "Ruim";
  };

  const heartRate = isLoading
    ? "..."
    : measurement
      ? `${Math.round(measurement.heartRate)} Bpm`
      : "--";

  const sleepQuality = isLoading
    ? "..."
    : getSleepQuality(measurement?.sleepHours);

  const temperature = isLoading
    ? "..."
    : measurement
      ? `${measurement.temperature.toFixed(1).replace(".", ",")}°C`
      : "--";

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
              textTitle={heartRate}
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
              textTitle={sleepQuality}
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
              textTitle={temperature}
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
