import { ActivityIndicator, Text, View } from "react-native";
import { useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import LayoutWrapper from "../../components/LayoutWrapper";
import Header from "../../components/Header";
import CardPetDetail from "../../components/CardPetDetail";
import CardInformationDetailPet from "../../components/CardInformationDetailPet";
import CardActionPet from "../../components/CardActionPet";
import ContainerRecordHealth from "../../components/ContainerRecordHealth";
import ContainerNextEvents from "../../components/ContainerNextEvents";
import EditPetModal from "../../components/EditPetModal";
import DeletePetModal from "../../components/DeletePetModal";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../styles/styles";
import { useMyPets } from "../../hooks/useMyPets";
import { RootStackParamList } from "../../navigation/AppNavigator";

type PetDetailRouteProp = RouteProp<RootStackParamList, "PetDetailScreen">;
type PetDetailNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function PetsDetailScreen() {
  const route = useRoute<PetDetailRouteProp>();
  const navigation = useNavigation<PetDetailNavigationProp>();
  const { petId } = route.params;
  const { data: pets = [], isLoading, isError } = useMyPets();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const pet = pets.find((pet) => pet.id === petId);

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

            <CardInformationDetailPet
              pet={pet}
              onEdit={() => setEditModalVisible(true)}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <CardActionPet
                onPress={() => console.log("Histórico:", pet.id)}
                text="Histórico"
                icon={<Feather name="file-text" size={40} color="black" />}
              />

              <CardActionPet
                onPress={() => setDeleteModalVisible(true)}
                text="Remover pet"
                background={COLORS.red[300]}
                colorText={COLORS.red[600]}
                borderColor={COLORS.red[600]}
                icon={
                  <MaterialIcons
                    name="highlight-remove"
                    size={40}
                    color={COLORS.red[500]}
                  />
                }
              />
            </View>

            <ContainerRecordHealth />

            <ContainerNextEvents />

            <EditPetModal
              visible={editModalVisible}
              pet={pet}
              onClose={() => setEditModalVisible(false)}
            />

            <DeletePetModal
              visible={deleteModalVisible}
              pet={pet}
              onClose={() => setDeleteModalVisible(false)}
              onDeleted={() => navigation.goBack()}
            />
          </>
        )}
      </View>
    </LayoutWrapper>
  );
}