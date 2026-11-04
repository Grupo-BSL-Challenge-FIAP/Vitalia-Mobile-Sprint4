import { useState } from "react";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import Header from "../../components/Header";
import LayoutWrapper from "../../components/LayoutWrapper";
import SubTitleOrange from "../../components/SubTitleOrange";
import { COLORS, FONTS } from "../../styles/styles";
import TitleOrange from "../../components/TitleOrange";
import { useMyPets } from "../../hooks/useMyPets";
import { useImages } from "../../contexts/ImageContext";

export default function ScheduleAppointment() {
  const { data: pets = [], isLoading, isError } = useMyPets();
  const { getPetImage } = useImages();
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
  const selectedPet = pets.find((pet) => pet.id === selectedPetId) ?? pets[0] ?? null;

  return (
    <LayoutWrapper paddingHorizontal={-1} paddingBottom={80}>
      <Header textHeader="Marcar consulta" />

      <View style={{ margin: 20 }}>
        <SubTitleOrange
          title="Para quem é a consulta?"
          color={COLORS.orange[710]}
          fontFamily={FONTS.inter[500]}
          fontSize={15}
        />

        <TitleOrange
          title="Selecione o pet"
          color={COLORS.orange[710]}
          fontFamily={FONTS.inter[700]}
          fontSize={15}
        />

        {isLoading && (
          <View style={{ alignItems: "center", marginTop: 30 }}>
            <ActivityIndicator size="large" color={COLORS.orange[710]} />

            <Text
              style={{
                marginTop: 10,
                color: COLORS.gray[400],
                fontFamily: FONTS.inter[500],
              }}
            >
              Carregando pets...
            </Text>
          </View>
        )}

        {isError && (
          <Text
            style={{
              marginTop: 20,
              color: COLORS.gray[400],
              fontFamily: FONTS.inter[500],
            }}
          >
            Não foi possível carregar os pets. Tente novamente.
          </Text>
        )}

        {!isLoading && !isError && pets.length === 0 && (
          <Text
            style={{
              marginTop: 20,
              color: COLORS.gray[400],
              fontFamily: FONTS.inter[500],
            }}
          >
            Nenhum pet cadastrado.
          </Text>
        )}

        {!isLoading && !isError && pets.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginTop: 15,
              gap: 20,
            }}
          >
            {pets.map((pet) => {
              const isSelected = selectedPet?.id === pet.id;

              return (
                <View
                  key={pet.id}
                  style={{
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <Pressable
                    onPress={() => setSelectedPetId(pet.id)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                    style={{
                      padding: 15,
                      backgroundColor: isSelected ? COLORS.orange[960] : COLORS.orange[920],
                      borderWidth: 0.5,
                      borderRadius: 10,
                      borderColor: isSelected ? COLORS.orange[710] : COLORS.orange[930],
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <View
                      style={{
                        borderRadius: 10,
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        style={{
                          width: 69,
                          height: 69,
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: COLORS.orange[930],
                        }}
                        source={getPetImage(
                          pet.speciesId,
                          pet.sex,
                          undefined,
                          pet.id,
                        )}
                      />
                    </View>

                    <TitleOrange
                      title={pet.name}
                      fontSize={15}
                      fontFamily={FONTS.inter[500]}
                      color={isSelected ? COLORS.white[100] : COLORS.orange[900]}
                    />
                  </Pressable>

                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: FONTS.inter[500],
                      color: isSelected ? COLORS.orange[710] : COLORS.gray[400],
                    }}
                  >
                    {isSelected ? "(selecionado)" : "(não selecionado)"}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
      </View>
    </LayoutWrapper>
  );
}