import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useMyPets } from "../../hooks/useMyPets";
import { COLORS, FONTS } from "../../styles/styles";
import ButtonScheduledAppointment from "../ButtonScheduledAppointment";
import SubTitleOrange from "../SubTitleOrange";
import CardPetConsultations from "../CardPetConsultations";
import { useAllPetAppointments } from "../../hooks/useAllPetAppointments";
import { useImages } from "../../contexts/ImageContext";
import TitleOrange from "../TitleOrange";

type PetFilter = "Todos" | number;

export default function ConsultationWithAppointment() {
  const [active, setActive] = useState<PetFilter>("Todos");

  const {
    data: pets = [],
    isLoading: isLoadingPets,
    isError: isErrorPets,
  } = useMyPets();

  const { getPetImage } = useImages();

  const petIds = pets.map(
    (pet) => pet.id,
  );

  const {
    data: appointments = [],
    isLoading: isLoadingAppointments,
    isError: isErrorAppointments,
  } = useAllPetAppointments(petIds);

  const getSpeciesIdFromPet = (pet: any) => {
    if (typeof pet?.speciesId === "number") {
      return pet.speciesId;
    }

    if (typeof pet?.breed?.speciesId === "number") {
      return pet.breed.speciesId;
    }

    return null;
  };

  const filteredAppointments = appointments
    .filter((appointment) => {
      if (active === "Todos") {
        return true;
      }

      return appointment.petId === active;
    })
    .sort(
      (a, b) =>
        new Date(a.appointmentDate).getTime() -
        new Date(b.appointmentDate).getTime(),
    );

  const renderFilter = (
    filter: PetFilter,
    label: string,
  ) => {
    const isActive = active === filter;

    return (
      <TouchableOpacity
        onPress={() => setActive(filter)}
        style={{
          position: "relative",
          backgroundColor: isActive ? COLORS.orange[900] : COLORS.white[100],
          borderWidth: isActive ? 0 : 1,
          borderColor: COLORS.orange[970],
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            color: isActive ? COLORS.white[100] : COLORS.orange[970],
            paddingVertical: 6,
            paddingHorizontal: 20,
            fontFamily: FONTS.inter[700],
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  const isLoading =
    isLoadingPets ||
    isLoadingAppointments;

  const isError =
    isErrorPets ||
    isErrorAppointments;

  return (
    <View>
      {isLoading && (
        <ActivityIndicator
          size="small"
          color={COLORS.orange[900]}
        />
      )}

      {isError && (
        <Text
          style={{
            color: COLORS.orange[900],
            fontFamily: FONTS.inter[500],
          }}
        >
          Não foi possível carregar as consultas.
        </Text>
      )}

      {!isLoading && !isError && (
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: "row",
              gap: 15,
            }}
          >
            {renderFilter("Todos", "Todos")}

            {pets.map((pet) => (
              <View key={pet.id}>
                {renderFilter(
                  pet.id,
                  pet.name,
                )}
              </View>
            ))}
          </ScrollView>

          {filteredAppointments.length === 0 ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 600
              }}
            >
              <Image
                source={require('../../assets/appointment_card.png')}
              />

              <View
                style={{
                  gap: 10,
                  marginTop: 30
                }}
              >
                <TitleOrange
                  title="Nenhuma consulta marcada"
                  fontFamily={FONTS.inter[600]}
                  fontSize={20}
                />

                <ButtonScheduledAppointment />
              </View>
            </View>
          ) : (
            <View>
              <View
                style={{
                  paddingHorizontal: 40,
                  marginVertical: 20
                }}
              >
                <ButtonScheduledAppointment />
              </View>

              <View
                style={{
                  alignItems: 'center',
                  marginBottom: 20,
                }}
              >
                <SubTitleOrange 
                  title="Toque em algum dos cards para ver mais detalhes"
                  fontSize={12}
                  fontFamily={FONTS.inter[400]}
                  color={COLORS.orange[960]}
                />
              </View>

              <View
                style={{
                  gap: 15,
                }}
              >
                {filteredAppointments.map((appointment) => {
                  const pet = pets.find(
                    (pet) =>
                      pet.id === appointment.petId,
                  );

                  if (!pet) {
                    return null;
                  }

                  return (
                    <CardPetConsultations
                        key={appointment.id}
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
                    />
                  );
                })}
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
}