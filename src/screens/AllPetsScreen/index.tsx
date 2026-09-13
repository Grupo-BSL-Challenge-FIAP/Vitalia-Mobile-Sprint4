import { ActivityIndicator, Text, View, } from "react-native";
import LayoutWrapper from "../../components/LayoutWrapper";
import Header from "../../components/Header";
import TitleOrange from "../../components/TitleOrange";
import CardHeartbeatPet from "../../components/CardHeartbeatPet";
import ButtonLink from "../../components/ButtonLink";
import ContainerAddPet from "../../components/ContainerAddPet";
import { COLORS, FONTS } from "../../styles/styles";
import Feather from "@expo/vector-icons/Feather";
import { useMyPets } from "../../hooks/useMyPets";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function AllPetsScreen() {
  
  const { data: pets = [], isLoading, isError,} = useMyPets();
  const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <LayoutWrapper
      paddingHorizontal={-1}
      paddingBottom={80}
    >
      <Header
        textHeader="Pets"
        isBackBottom={false}
      />

      <View
        style={{
          paddingHorizontal: 15,
          marginTop: 20,
          gap: 20,
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TitleOrange
            title="Seus pets"
            fontFamily={FONTS.inter[700]}
            fontSize={24}
          />

          <ButtonLink
            children={
              <Feather
                name="plus-circle"
                size={30}
                color={COLORS.orange[900]}
              />
            }
            route="PetRegisterScreen"
            backgroundColor="none"
            borderWidth={-1}
            paddingHorizontal={-1}
            paddingVertical={-1}
          />
        </View>

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
            Não foi possível carregar seus pets.
          </Text>
        )}

        {!isLoading &&
          !isError &&
          pets.length === 0 && (
            <Text
              style={{
                fontFamily: FONTS.inter[500],
                color: COLORS.orange[900],
              }}
            >
              Você ainda não possui pets cadastrados.
            </Text>
          )}

        {!isLoading &&
          !isError &&
          pets.map((pet) => (
            <CardHeartbeatPet
              key={pet.id}
              pet={pet}
              onPress={() =>
                navigate.navigate("PetDetailScreen", {
                  petId: pet.id,
                })
              }
            />
          ))}

        <View
          style={{
            paddingTop: 60,
            paddingBottom: 50,
          }}
        >
          <ContainerAddPet />
        </View>
      </View>
    </LayoutWrapper>
  );
}