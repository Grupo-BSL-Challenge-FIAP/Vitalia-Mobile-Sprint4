import LayoutWrapper from "../../components/LayoutWrapper";
import Header from "../../components/Header";
import CardPet from "../../components/CardPet";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { useImages } from "../../contexts/ImageContext";
import { COLORS, FONTS } from "../../styles/styles";
import TitleOrange from "../../components/TitleOrange";
import SubTitleOrange from "../../components/SubTitleOrange";
import { RouteProp, useRoute } from "@react-navigation/native";
import { PetsStackParamList } from "../../navigation/PetsStackNavigator";
import { useMyPets } from "../../hooks/useMyPets";
import CardNumber from "../../components/CardNumber";
import { usePetAppointments } from "../../hooks/usePetAppointments";
import { useMeasurementHistory } from "../../hooks/useMeasurementHistory";

type PetHistoryRouteProp = RouteProp<PetsStackParamList, "PetHistoryScreen">;

export default function PetHistoryScreen() {
  const route = useRoute<PetHistoryRouteProp>();
  const { petId } = route.params;
  const { getPetImage } = useImages();
  const { data: pets = [], isLoading, isError } = useMyPets();
  const { data: appointments = [], isLoading: isLoadingAppointments } = usePetAppointments(petId);
  const pet = pets.find((pet) => pet.id === petId);
  const { data: measurements = [], isLoading: isLoadingMeasurements} = useMeasurementHistory(petId);

  const appointmentsCount = isLoadingAppointments
    ? "..."
    : String(appointments.length);

  const getPetAgeLabel = (birthDate?: string) => {
    if (!birthDate) {
      return "";
    }
  const [year, month, day] = birthDate.split("-").map(Number);
  const birth = new Date(year, month - 1, day);
  const today = new Date();
  let months = (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());

    if (today.getDate() < birth.getDate()) {
      months--;
    }

    if (months < 0) {
      return "";
    }

    if (months < 12) {
      return `${months} ${
        months === 1 ? "mês" : "meses"
      }`;
    }

    const years = Math.floor(months / 12);

    return `${years} ${ years === 1 ? "ano" : "anos" }`;
  };

  return (
    <LayoutWrapper paddingHorizontal={-1} paddingBottom={80}>
      <Header isBackBottom={true} textHeader={pet ? `Histórico - ${pet.name}` : "Histórico"}/>

      <View
        style={{
          paddingHorizontal: 12,
          marginTop: 20,
          marginBottom: 30,
          gap: 30,
        }}
      >
        {isLoading && (
          <ActivityIndicator
            size="large"
            color={COLORS.orange[900]}
          />
        )}

        {isError && (
          <Text
            style={{
              fontFamily: FONTS.inter[500],
              color: COLORS.orange[900],
            }}
          >
            Não foi possível carregar os dados do pet.
          </Text>
        )}

        {!isLoading && !isError && !pet && (
          <Text
            style={{
              fontFamily: FONTS.inter[500],
              color: COLORS.orange[900],
            }}
          >
            Pet não encontrado.
          </Text>
        )}

        {!isLoading && !isError && pet && (
          <CardPet
            boxShadow="0"
            borderBottomWidth={4}
            borderTopWidth={-1}
            flexDirection="row"
          >
            <Image
              source={getPetImage(
                pet.speciesId,
                pet.sex,
                undefined,
                pet.id,
              )}
              style={{
                width: 65,
                height: 65,
                borderRadius: 100,
              }}
            />

            <View
              style={{
                justifyContent: "center",
              }}
            >
              <TitleOrange
                title={pet.name}
                color={COLORS.white[100]}
                fontFamily={FONTS.inter[600]}
                fontSize={22}
              />

              <SubTitleOrange
                title={`${pet.breedName ?? "Raça não informada"} • ${getPetAgeLabel(pet.birthDate)}`}
                fontSize={16}
                color={COLORS.orange[200]}
                fontFamily={FONTS.inter[400]}
              />
            </View>
          </CardPet>
        )}

        <View
            style={{
                flexDirection: 'row',
                gap: 20
            }}
        >
            <CardNumber
                title={appointmentsCount}
                subTitle="Consultas"
            />

            <CardNumber
                title={isLoadingMeasurements ? "..." : String(measurements.length)}
                subTitle="Registros de saúde"
            />
        </View>
      </View>
    </LayoutWrapper>
  );
}