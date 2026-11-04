import { ActivityIndicator, Text, View } from "react-native";
import Header from "../../components/Header";
import LayoutWrapper from "../../components/LayoutWrapper";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ConsultationStackParamList } from "../../navigation/ConsultationStackNavigator";
import CardPetConsultations from "../../components/CardPetConsultations";
import { useAppointmentById } from "../../hooks/useAppointmentById";
import { useMyPets } from "../../hooks/useMyPets";
import { useImages } from "../../contexts/ImageContext";
import { COLORS, FONTS } from "../../styles/styles";
import CardConsultationInformationDetails from "../../components/CardConsultationInformationDetails";
import { MaterialIcons } from "@expo/vector-icons";

export default function ConsultatiionsDetailsScreen() {

  const route = useRoute<RouteProp<ConsultationStackParamList, "ConsultatiionsDetailsScreen">>();
  const { appointmentId, petId } = route.params;

  const {
    data: appointment,
    isLoading: isLoadingAppointment,
    isError: isErrorAppointment,
  } = useAppointmentById(appointmentId);

  const {
    data: pets = [],
    isLoading: isLoadingPets,
    isError: isErrorPets,
  } = useMyPets();

  const { getPetImage } = useImages();

  const pet = pets.find( (pet) => pet.id === petId,);

  const getSpeciesIdFromPet = (pet: any) => {
    if (typeof pet?.speciesId === "number") {
      return pet.speciesId;
    }

    if (typeof pet?.breed?.speciesId === "number") {
      return pet.breed.speciesId;
    }

    return null;
  };

  const isLoading = isLoadingAppointment || isLoadingPets;
  const isError = isErrorAppointment || isErrorPets;

  return(
      <LayoutWrapper paddingHorizontal={-1} paddingBottom={80}>
          <Header textHeader="Detalhes da consulta" />

          <View
            style={{
              paddingHorizontal: 20,
              marginTop: 20,
              gap: 20,
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
                  color: COLORS.red[600],
                  fontFamily: FONTS.inter[500],
                }}
              >
                Não foi possível carregar os detalhes da consulta.
              </Text>
            )}

            {!isLoading && !isError && appointment && pet && (
              <>
              <CardPetConsultations
                appointmentId={appointment.id}
                petId={appointment.petId}
                petName={pet.name}
                petImage={getPetImage(
                  getSpeciesIdFromPet(pet),
                  pet.sex,
                  undefined,
                  pet.id,
                )}
                title={appointment.notes || "Consulta"}
                veterinarianName={appointment.veterinarianName}
                appointmentDate={appointment.appointmentDate}
                status={appointment.status}
                disableNavigation={true}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <CardConsultationInformationDetails 
                  icon={<MaterialIcons name="event" size={29} color={COLORS.orange[900]} />}
                  title="15 de novembro"
                  subTitle="Data"
                />
                <CardConsultationInformationDetails 
                  icon={<MaterialIcons name="event" size={29} color={COLORS.orange[900]} />}
                  title="10h30"
                  subTitle="Hora"
                />
              </View>
              </>
            )}
          </View>
      </LayoutWrapper>
  )
}