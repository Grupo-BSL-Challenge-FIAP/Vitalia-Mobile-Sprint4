import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS } from "../../styles/styles";
import { useState } from "react";
import { useMyPets } from "../../hooks/useMyPets";
import TitleOrange from "../TitleOrange";
import ButtonScheduledAppointment from "../ButtonScheduledAppointment";

type PetFilter = "Todos" | number;

export default function ConsultationWithOutAppointment() {

  const [active, setActive] = useState<PetFilter>("Todos");

  const {
    data: pets = [],
    isLoading,
    isError,
  } = useMyPets();

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
          Não foi possível carregar os pets.
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

            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 600

                }}
            >
                <Image source={require('../../assets/appointment_card.png')} />
                <View
                    style={{
                        gap: 10,
                        marginTop: 30
                    }}
                >
                    <TitleOrange title="Nenhuma consulta marcada" fontFamily={FONTS.inter[600]} fontSize={20} />
                    <ButtonScheduledAppointment />
                </View>
            </View>
        </View>
      )}
    </View>
  );
}