import { Image, Text, View } from "react-native";
import LayoutWrapper from "../../components/LayoutWrapper";
import ContainerForm from "../../components/ContainerForm";
import ContainerTitleSubTitle from "../../components/ContainerTitleSubTitle";
import InputForm from "../../components/InputForm";
import { BACKGROUND, COLORS, FONTS } from "../../styles/styles";
import Button from "../../components/Button";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ButtonLink from "../../components/ButtonLink";
import { RootStackParamList } from "../../navigation/AppNavigator";
import ContainerImage from "../../components/ContainerImage";
import ContainerButton from "../../components/ContainerButton";

export default function AuthenticationCodeScreen({ route }: { route: keyof RootStackParamList;}) {
  return (
    <LayoutWrapper isDogPawBottomTop={true}>
      <ContainerImage
        imagePath={require("../../assets/imgAuthenticator.png")}
      />

      <View
        style={{
          marginBottom: 20,
        }}
      >
        <ContainerTitleSubTitle
          alignItems="center"
          textTitle="Autenticação necessária"
          textSubTitle={` Enviamos um código de verificação para o seu e-mail cadastrado. Insira o código abaixo para continuar.\n(O código expira em 5 minutos.)`}
          fontSizeSubTitle={18}
        />
      </View>

      <ContainerForm paddingHorizontal={8}>
        <InputForm
          label="Código:"
          placeholder="Digite o código aqui "
          borderBottomWidth={5}
          marginBottom={15}
        />

        <Text
          style={{
            fontSize: 14,
            fontFamily: FONTS.poppins[500],
            color: COLORS.orange[900],
          }}
        >
          Não recebeu o código? Verifique sua caixa de
          <Text style={{ fontFamily: FONTS.poppins[700] }}> spam </Text>
          ou
          <Text style={{ fontFamily: FONTS.poppins[700] }}> lixeira.</Text>
        </Text>

        <ContainerButton marginHorizontal={20} marginTop={30} gap={20}>
          <Button
            onPress={() => {}}
            backgroundColor={BACKGROUND.backgroundMain}
            colorText={COLORS.orange[900]}
            borderWidth={2}
            paddingVertical={8}
            iconLeft={
              <Feather
                name="refresh-ccw"
                size={27}
                color={COLORS.orange[900]}
              />
            }
          >
            Reenviar código
          </Button>
          <ButtonLink
            route={route}
            backgroundColor={COLORS.orange[900]}
            colorText={COLORS.white[100]}
            borderWidth={2}
            paddingVertical={8}
            iconRight={
              <MaterialCommunityIcons
                name="login"
                size={35}
                color={COLORS.white[100]}
              />
            }
          >
            Entrar
          </ButtonLink>
        </ContainerButton>
      </ContainerForm>
    </LayoutWrapper>
  );
}