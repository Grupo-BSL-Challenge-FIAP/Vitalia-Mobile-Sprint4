import { ActivityIndicator, Text, View } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LayoutWrapper from "../../components/LayoutWrapper";
import Header from "../../components/Header";
import CardPetDetail from "../../components/CardPetDetail";
import { COLORS, FONTS } from "../../styles/styles";
import { useMyPets } from "../../hooks/useMyPets";
import CardInformationDetailPet from "../../components/CardInformationDetailPet";

export default function PetsDetailScreen() {
  const { data: pets = [], isLoading, isError } = useMyPets();

  const [activePetId, setActivePetId] = useState<number | null>(null);

  useEffect(() => {
    const loadActivePet = async () => {
      const storedPetId = await AsyncStorage.getItem(
        "@petguardian:activePetId",
      );

      if (storedPetId) {
        setActivePetId(Number(storedPetId));
      }
    };

    loadActivePet();
  }, []);

  const pet = pets.find((pet) => pet.id === activePetId);

  return (
    <LayoutWrapper paddingHorizontal={-1} paddingBottom={80}>
      <Header textHeader="Detalhes do Pet" isBackBottom={true} />

      <View
        style={{
          paddingHorizontal: 12,
          marginTop: 20,
          gap: 30,
        }}
      >
        {isLoading && (
          <ActivityIndicator size="large" color={COLORS.orange[900]} />
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
          <>
            <CardPetDetail pet={pet} />

            <CardInformationDetailPet pet={pet} />
          </>
        )}
      </View>
    </LayoutWrapper>
  );
}