import { Image, View, Text } from "react-native";
import { COLORS, FONTS } from "../../styles/styles";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import CardStatus from "../CardStatus";
import ContainerStatus from "../ContainerStatus";
import ButtonLink from "../ButtonLink";
import { useActivePet } from "../../contexts/ActivePetContext";
import { useLatestMeasurement } from "../../hooks/useLatestMeasurement";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";

export default function StatusPet() {
  const { activePetId } = useActivePet();
  const { data: measurement, isLoading } = useLatestMeasurement(activePetId);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const getSleepQuality = (sleepHours?: number) => {
    if (sleepHours === undefined) return "--";

    if (sleepHours >= 10) return "Boa";
    if (sleepHours >= 8) return "Regular";

    return "Ruim";
  };

  const sleepQuality = isLoading ? "..." : getSleepQuality(measurement?.sleepHours);
  const heartRate = isLoading ? "..." : measurement ? `${Math.round(measurement.heartRate)} Bpm` : "--";
  const activityLevel = isLoading ? "..." : measurement ? `${Math.round(measurement.activityLevel)}%` : "--";
  const temperature = isLoading ? "..." : measurement ? `${measurement.temperature.toFixed(1)} °C` : "--";

  return (
    <View
      style={{
        gap: 10,
      }}
    >
      <Text
        style={{
          color: "black",
          fontFamily: FONTS.inter[700],
          fontSize: 24,
        }}
      >
        Status
      </Text>

      <ContainerStatus>
        <CardStatus>
          <View
            style={{
              alignItems: "flex-end",
            }}
          >
            <Image source={require("../../assets/iconSleep.png")} />
          </View>
          <View
            style={{
              alignItems: "flex-start",
              gap: 20,
            }}
          >
            <Text
              style={{
                color: "black",
                fontFamily: FONTS.inter[700],
                fontSize: 24,
                marginLeft: 20,
              }}
            >
              {sleepQuality}
            </Text>
            <Text
              style={{
                color: "black",
                fontFamily: FONTS.inter[500],
                fontSize: 14,
              }}
            >
              Qualidade do Sono
            </Text>
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
          <View
            style={{
              alignItems: "flex-start",
              gap: 20,
            }}
          >
            <Text
              style={{
                color: "black",
                fontFamily: FONTS.inter[700],
                fontSize: 24,
              }}
            >
              {heartRate}
            </Text>
            <Text
              style={{
                color: "black",
                fontFamily: FONTS.inter[500],
                fontSize: 14,
              }}
            >
              Frequência cardíaca
            </Text>
          </View>
        </CardStatus>

        <CardStatus paddingRight={10} paddingBottom={30}>
          <View
            style={{
              alignItems: "flex-end",
            }}
          >
            <FontAwesome6 name="paw" size={50} color="black" />
          </View>
          <View
            style={{
              alignItems: "flex-start",
              gap: 20,
            }}
          >
            <Text
              style={{
                color: "black",
                fontFamily: FONTS.inter[700],
                fontSize: 24,
              }}
            >
              {activityLevel}
            </Text>
            <Text
              style={{
                color: "black",
                fontFamily: FONTS.inter[500],
                fontSize: 14,
              }}
            >
              Nível de atividade
            </Text>
          </View>
        </CardStatus>

        <CardStatus paddingRight={10} paddingBottom={30}>
          <View
            style={{
              alignItems: "flex-end",
            }}
          >
            <FontAwesome6 name="temperature-half" size={50} color="black" />
          </View>
          <View
            style={{
              alignItems: "flex-start",
              gap: 20,
            }}
          >
            <Text
              style={{
                color: "black",
                fontFamily: FONTS.inter[700],
                fontSize: 24,
              }}
            >
              {temperature}
            </Text>
            <Text
              style={{
                color: "black",
                fontFamily: FONTS.inter[500],
                fontSize: 14,
              }}
            >
              Temperatura corporal
            </Text>
          </View>
        </CardStatus>

        <View style={{ width: "100%" }}>
          <ButtonLink
            onPress={() => {
              if (!activePetId) {
                return;
              }

              navigation.navigate("PetDetailScreen", {
                petId: activePetId
              });
            }}
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
