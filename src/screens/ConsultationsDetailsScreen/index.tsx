import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import Header from "../../components/Header";
import LayoutWrapper from "../../components/LayoutWrapper";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ConsultationStackParamList } from "../../navigation/ConsultationStackNavigator";
import CardPetConsultations from "../../components/CardPetConsultations";
import { useMyPets } from "../../hooks/useMyPets";
import { useImages } from "../../contexts/ImageContext";
import { COLORS, FONTS } from "../../styles/styles";
import CardConsultationInformationDetails from "../../components/CardConsultationInformationDetails";
import { MaterialIcons } from "@expo/vector-icons";
import { CardConsultationDetail } from "../../components/CardConsultationDetail";
import TitleOrange from "../../components/TitleOrange";
import SubTitleOrange from "../../components/SubTitleOrange";
import Feather from "@expo/vector-icons/Feather";
import { useAppointmentById } from "../../hooks/useAppointmentById";

function formatAppointmentDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Data não informada";
  }

  return date.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
  });
}

function formatAppointmentTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "--h--";
  }

  return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }).replace(":", "h");
}

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

  const pet = pets.find(
    (pet) => pet.id === (appointment?.petId ?? petId),
  );

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

  return (
    <LayoutWrapper paddingHorizontal={-1} paddingBottom={80}>
      <Header textHeader="Detalhes da consulta" />

      <View
        style={{
          paddingHorizontal: 20,
          marginTop: 20,
          marginBottom: 140,
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

        {!isLoading && !isError && (!appointment || !pet) && (
          <Text
            style={{
              color: COLORS.gray[400],
              fontFamily: FONTS.inter[500],
            }}
          >
            Não foi possível localizar os dados da consulta ou do pet.
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
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <CardConsultationInformationDetails
                icon={
                  <MaterialIcons
                    name="event"
                    size={29}
                    color={COLORS.orange[900]}
                  />
                }
                title={formatAppointmentDate(appointment.appointmentDate)}
                subTitle="Data"
              />

              <CardConsultationInformationDetails
                icon={
                  <Feather 
                    name="clock" 
                    size={24} 
                    color={COLORS.orange[900]} 
                  />
                }
                title={formatAppointmentTime(appointment.appointmentDate)}
                subTitle="Hora"
              />
            </View>

            <CardConsultationDetail
              title="Veterinário"
              paddingTop={12}
              paddingBottom={12}
              paddingLeft={16}
              gap={12}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: COLORS.gray[600],
                  borderRadius: 100,
                }}
              />

              <View>
                <TitleOrange
                  title={
                    appointment.veterinarianName ||
                    "Veterinário não informado"
                  }
                  fontFamily={FONTS.inter[500]}
                  fontSize={15}
                />

                <SubTitleOrange
                  title="Veterinário responsável"
                  color={COLORS.gray[400]}
                  fontFamily={FONTS.inter[400]}
                  fontSize={12}
                />
              </View>
            </CardConsultationDetail>

            <CardConsultationDetail
              title="Local"
              gap={12}
              paddingVertical={12}
              paddingLeft={16}
            >
              <View>
                <Feather
                  name="map-pin"
                  size={24}
                  color={COLORS.orange[900]}
                />
              </View>

              <View>
                <TitleOrange
                  title={appointment.location || "Local não informado"}
                  fontFamily={FONTS.inter[500]}
                  fontSize={15}
                />

                <SubTitleOrange
                  title="Local da consulta"
                  color={COLORS.gray[400]}
                  fontFamily={FONTS.inter[400]}
                  fontSize={12}
                />
              </View>
            </CardConsultationDetail>

            <CardConsultationDetail
              title="Tipo de consulta"
              gap={12}
              paddingVertical={14}
              paddingLeft={16}
            >
              <View>
                <TitleOrange
                  title={appointment.appointmentType || "Tipo não informado"}
                  fontFamily={FONTS.inter[500]}
                  fontSize={15}
                />
              </View>
            </CardConsultationDetail>
          </>
        )}
      </View>
    </LayoutWrapper>
  );
}