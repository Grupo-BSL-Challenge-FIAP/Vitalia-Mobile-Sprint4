import { Image, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS } from "../../styles/styles";
import TitleOrange from "../TitleOrange";
import SubTitleOrange from "../SubTitleOrange";
import BpmCircle from "../BpmCircle";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { CardHeartbeatPetType } from "../../types/CardHeartbeatPetType";
import { useImages } from "../../contexts/ImageContext";
import { useLatestMeasurement } from "../../hooks/useLatestMeasurement";
import { usePetAppointments } from "../../hooks/usePetAppointments";
import { useTheme } from "../../contexts/ThemeContext";

export default function CardHeartbeatPet({
  pet,
  onPress,
}: CardHeartbeatPetType) {
  const { getPetImage } = useImages();

  const { data: measurement, isLoading } = useLatestMeasurement(pet.id);

  const {
    data: appointments = [],
    isLoading: isLoadingAppointments,
  } = usePetAppointments(pet.id);

  const { isDarkMode } = useTheme();

  const iconColor = isDarkMode
    ? COLORS.white[100]
    : COLORS.orange[900];

  const heartRate = isLoading
    ? "..."
    : measurement
      ? Math.round(measurement.heartRate)
      : null;

  const nextAppointment = appointments
    .filter((appointment) => {
      return (
        new Date(appointment.appointmentDate).getTime() > Date.now() &&
        appointment.status === "SCHEDULED"
      );
    })
    .sort(
      (a, b) =>
        new Date(a.appointmentDate).getTime() -
        new Date(b.appointmentDate).getTime()
    )[0];

  const getAppointmentLabel = () => {
    if (isLoadingAppointments) {
      return "Carregando consulta...";
    }

    if (!nextAppointment) {
      return "Tudo em dia!";
    }

    const appointmentDate = new Date(nextAppointment.appointmentDate);
    const difference = appointmentDate.getTime() - Date.now();
    const days = Math.ceil(difference / (1000 * 60 * 60 * 24));

    if (days <= 0) {
      return "Consulta hoje";
    }

    if (days === 1) {
      return "Consulta amanhã";
    }

    return `Consulta em ${days} dias`;
  };

  const getSpeciesIdFromPet = () => {
    if (typeof pet?.speciesId === "number") {
      return pet.speciesId;
    }

    return null;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: isDarkMode ? "#1E1E1E" : COLORS.orange[100],
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: COLORS.orange[900],
        padding: 15,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Image
            source={getPetImage(
              pet.speciesId,
              pet.sex,
              undefined,
              pet.id,
            )}
            style={{
              width: 70,
              height: 70,
              borderRadius: 10,
              borderColor: COLORS.orange[900],
              borderWidth: 2,
            }}
          />

          <View>
            <TitleOrange
              title={pet.name}
              fontSize={20}
              fontFamily={FONTS.inter[700]}
            />

            <SubTitleOrange
              title={pet.breedName ?? "Raça não informada"}
              fontFamily={FONTS.inter[500]}
              color={COLORS.orange[900]}
              fontSize={12}
            />

            <SubTitleOrange
              title={pet.sex}
              fontFamily={FONTS.inter[500]}
              color={COLORS.orange[900]}
              fontSize={12}
            />
          </View>
        </View>

        <BpmCircle
          bpm={heartRate}
          status={pet.status}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            marginLeft: !nextAppointment ? -80 : -40,
          }}
        >
          {!isLoadingAppointments && !nextAppointment ? (
            <Feather
              name="check-circle"
              size={24}
              color={iconColor}
            />
          ) : (
            <FontAwesome6
              name="calendar-check"
              size={20}
              color={iconColor}
            />
          )}

          <Text
            style={{
              fontFamily: FONTS.inter[700],
              fontSize: 14,
              color: iconColor,
            }}
          >
            {getAppointmentLabel()}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: -30,
        }}
      >
        <Entypo
          name="chevron-small-right"
          size={35}
          color={isDarkMode ? COLORS.white[100] : "black"}
        />
      </View>
    </TouchableOpacity>
  );
}
