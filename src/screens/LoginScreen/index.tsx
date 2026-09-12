import LayoutWrapper from "../../components/LayoutWrapper";
import ContainerImage from "../../components/ContainerImage";
import ContainerTitleSubTitle from "../../components/ContainerTitleSubTitle";
import { COLORS, FONTS } from "../../styles/styles";
import ContainerForm from "../../components/ContainerForm";
import InputForm from "../../components/InputForm";
import { View } from "react-native";
import TextLink from "../../components/TextLink";
import ButtonFormLink from "../../components/ButtonFormLink";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AlertMessageError from "../../components/AlertMessageError";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [messageError, setMessageError] = useState("");

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const validateLogin = async () => {
    const newErrors = {
      email: false,
      password: false,
    };

    if (!email.trim()) {
      newErrors.email = true;
      setErrors(newErrors);
      setMessageError("O e-mail é obrigatório.");
      return false;
    }

    if (!password.trim()) {
      newErrors.password = true;
      setErrors(newErrors);
      setMessageError("A senha é obrigatória.");
      return false;
    }

    const responsibleData = await AsyncStorage.getItem(
      "@petguardian:responsibleData"
    );

    if (!responsibleData) {
      newErrors.email = true;
      newErrors.password = true;
      setErrors(newErrors);
      setMessageError("Nenhuma conta cadastrada foi encontrada.");
      return false;
    }

    const responsible = JSON.parse(responsibleData);

    if (email.trim() !== responsible.email) {
      newErrors.email = true;
      setErrors(newErrors);
      setMessageError("E-mail não encontrado.");
      return false;
    }

    if (password !== responsible.password) {
      newErrors.password = true;
      setErrors(newErrors);
      setMessageError("Senha incorreta.");
      return false;
    }

    setErrors(newErrors);
    setMessageError("");
    return true;
  };

  const handleLogin = async () => {
    const isValid = await validateLogin();

    if (!isValid) return;

    navigation.navigate("TabsDashboardResponsible");
  };

  return (
    <LayoutWrapper isDogPawBottomTop={true}>
      <ContainerImage
        imagePath={require("../../assets/petGuardianLogo.png")}
        marginTop={73}
      />

      <ContainerTitleSubTitle
        textTitle={`Que bom ver\nvocê novamente!`}
        textSubTitle="Insira seus dados para continuar."
        fontFamilySubTitle={FONTS.poppins[700]}
        marginBottom={33}
      />

      <ContainerForm>
        <InputForm
          label="E-mail: "
          placeholder="Digite seu e-mail"
          marginBottom={30}
          value={email}
          onChangeText={setEmail}
          error={errors.email}
        />

        <InputForm
          label="Senha: "
          placeholder="Digite sua senha"
          marginBottom={10}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          error={errors.password}
        />

        <View>
          <TextLink
            route="ResponsibleRegisterScreen"
            textLink="Não tem uma conta? Clique aqui."
          />

          <TextLink
            route="ForgotPasswordScreen"
            textLink="Esqueci minha senha."
          />
        </View>

        {messageError.length > 0 && (
          <AlertMessageError message={messageError} />
        )}

        <ButtonFormLink
          onPress={handleLogin}
          marginTop={32}
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
        </ButtonFormLink>
      </ContainerForm>
    </LayoutWrapper>
  );
}