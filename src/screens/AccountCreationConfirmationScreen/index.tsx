import LayoutWrapper from "../../components/LayoutWrapper";
import ContainerTitleSubTitle from "../../components/ContainerTitleSubTitle";
import DataConfirmationCard from "../../components/DataConfirmationCard";
import { View } from "react-native";
import HeaderForm from "../../components/HeaderForm";
import ButtonFormLink from "../../components/ButtonFormLink";
import Feather from "@expo/vector-icons/Feather";
import { COLORS } from "../../styles/styles";
import { useEffect, useState } from "react";
import { ResponsibleType } from "../../types/ResponsibleType";
import { PetType } from "../../types/PetType";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

export default function AccountCreationConfirmationScreen() {
  const navigate =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [responsible, setResponsible] = useState<ResponsibleType>({
    name: "",
    email: "",
    birthDate: "",
    cpf: "",
    phone: "",
    address: "",
  });

  const [pet, setPet] = useState<PetType>({
    id: 0,
    name: "",
    species: "",
    breed: "",
    gender: "",
    birthDate: "",
    weight: "",
  });

  useEffect(() => {
    const loadStorageData = async () => {
      const responsibleData = await AsyncStorage.getItem(
        "@petguardian:responsibleData",
      );

      const petsData = await AsyncStorage.getItem("@petguardian:petsData");
      const activePetId = await AsyncStorage.getItem(
        "@petguardian:activePetId",
      );

      if (responsibleData) {
        setResponsible(JSON.parse(responsibleData));
      }

      if (petsData) {
        const pets = JSON.parse(petsData);

        const activePet = pets.find(
          (pet: PetType) => pet.id === Number(activePetId),
        );

        if (activePet) {
          setPet(activePet);
        }
      }
    };

    loadStorageData();
  }, []);

  const handleCreateAccount = () => {
    const newAccountData = {
      responsible,
      pet,
    };

    console.log("Dados da nova conta:", newAccountData);

    navigate.navigate("TabsDashboardResponsible");
  };

  return (
    <LayoutWrapper isDogPawBottomTop={true}>
      <View
        style={{
          flex: 1,
          gap: 30,
          paddingTop: 30,
        }}
      >
        <HeaderForm initialStep={3} />
        <ContainerTitleSubTitle
          textTitle="Tudo certo!"
          textSubTitle="Confira se os dados estão certos:"
          fontSizeSubTitle={15}
        />
        <DataConfirmationCard title="Responsável:">
          <ContainerTitleSubTitle
            alignItems="center"
            textTitle="Nome: "
            textSubTitle={responsible.name}
            fontSizeTiTleOrange={18}
            fontSizeSubTitle={18}
            flexDirection="row"
            gap={2}
          />
          <ContainerTitleSubTitle
            alignItems="center"
            textTitle="Data de nascimento: "
            textSubTitle={responsible.birthDate}
            fontSizeTiTleOrange={18}
            fontSizeSubTitle={18}
            flexDirection="row"
            gap={2}
          />
          <ContainerTitleSubTitle
            alignItems="center"
            textTitle="CPF: "
            textSubTitle={responsible.cpf}
            fontSizeTiTleOrange={18}
            fontSizeSubTitle={18}
            flexDirection="row"
            gap={2}
          />
          <ContainerTitleSubTitle
            alignItems="center"
            textTitle="Telefone: "
            textSubTitle={responsible.phone}
            fontSizeTiTleOrange={18}
            fontSizeSubTitle={18}
            flexDirection="row"
            gap={2}
          />
          <ContainerTitleSubTitle
            alignItems="center"
            textTitle="Endereço: "
            textSubTitle={responsible.address}
            fontSizeTiTleOrange={18}
            fontSizeSubTitle={18}
            flexDirection="row"
            gap={2}
          />
        </DataConfirmationCard>
        <DataConfirmationCard title="Pet:">
          <ContainerTitleSubTitle
            alignItems="center"
            textTitle="Nome: "
            textSubTitle={pet.name}
            fontSizeTiTleOrange={18}
            fontSizeSubTitle={18}
            flexDirection="row"
            gap={2}
          />
          <ContainerTitleSubTitle
            alignItems="center"
            textTitle="Espécie: "
            textSubTitle={pet.species}
            fontSizeTiTleOrange={18}
            fontSizeSubTitle={18}
            flexDirection="row"
            gap={2}
          />
          <ContainerTitleSubTitle
            alignItems="center"
            textTitle="Raça: "
            textSubTitle={pet.breed}
            fontSizeTiTleOrange={18}
            fontSizeSubTitle={18}
            flexDirection="row"
            gap={2}
          />
          <ContainerTitleSubTitle
            alignItems="center"
            textTitle="Sexo: "
            textSubTitle={pet.gender}
            fontSizeTiTleOrange={18}
            fontSizeSubTitle={18}
            flexDirection="row"
            gap={2}
          />
          <ContainerTitleSubTitle
            alignItems="center"
            textTitle="Nascimento: "
            textSubTitle={pet.birthDate}
            fontSizeTiTleOrange={18}
            fontSizeSubTitle={18}
            flexDirection="row"
            gap={2}
          />
          <ContainerTitleSubTitle
            alignItems="center"
            textTitle="Peso: "
            textSubTitle={pet.weight}
            fontSizeTiTleOrange={18}
            fontSizeSubTitle={18}
            flexDirection="row"
            gap={2}
          />
        </DataConfirmationCard>
        <ButtonFormLink
          onPress={handleCreateAccount}
          marginHorizontal={20}
          marginTop={20}
          iconLeft={
            <Feather name="user-plus" size={35} color={COLORS.white[100]} />
          }
          colorText={COLORS.white[100]}
        >
          Criar conta
        </ButtonFormLink>
      </View>
    </LayoutWrapper>
  );
}
