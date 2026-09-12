import { Text, TouchableOpacity, View } from "react-native";
import LayoutWrapper from "../../components/LayoutWrapper";
import { BACKGROUND, COLORS, FONTS } from "../../styles/styles";
import TitleOrange from "../../components/TitleOrange";
import SubTitleOrange from "../../components/SubTitleOrange";
import ButtonLink from "../../components/ButtonLink";
import ContainerButton from "../../components/ContainerButton";


export default function HomeLoginCadastroScreen() {
  return (
    <LayoutWrapper paddingHorizontal={30} paddingBottom={50} isDogPaws={true}>
        <View 
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            gap: 50,
          }}
        >
          <View
            style={{
              gap: 15
            }}
          >
            <TitleOrange title={`Boas vindas ao\nPet Guardian!`} />
            <SubTitleOrange title={`Faça login ou cadastre-se para começar a cuidar do seu pet!`} />
          </View>
          <ContainerButton
            gap={19}
          >
            <ButtonLink
              route="LoginScreen"
              backgroundColor={COLORS.orange[900]}
              colorText={COLORS.orange[100]}
            >
              Entrar na conta
            </ButtonLink>
            <ButtonLink
              route="ResponsibleRegisterScreen"
              backgroundColor={BACKGROUND.backgroundMain}
              colorText={COLORS.orange[900]}
            >
              Fazer cadastro
            </ButtonLink>
          </ContainerButton>
        </View>
    </LayoutWrapper>
  );
}