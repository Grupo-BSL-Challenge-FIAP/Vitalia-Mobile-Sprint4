import { ActivityIndicator, Text, View } from "react-native";
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
import { useTheme } from "../../contexts/ThemeContext";

export default function AllPetsScreen() {
  const { data: pets = [], isLoading, isError } = useMyPets();

  const navigate =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { isDarkMode } = useTheme();

  const textColor = isDarkMode
    ? COLORS.white[100]
    : COLORS.orange[900];

  return (
    <LayoutWrapper
      paddingHorizontal={-1}
      paddingBottom={80}
    >
      <Header
        textHeader="Pets"
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
                color={textColor}
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
            color={textColor}
          />
        )}

        {isError && (
          <Text
            style={{
              fontFamily: FONTS.inter[500],
              color: textColor,
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
                color: textColor,
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