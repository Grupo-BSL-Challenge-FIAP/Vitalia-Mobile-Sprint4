import { View } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import LayoutWrapper from "../../components/LayoutWrapper";
import ContainerImage from "../../components/ContainerImage";
import ContainerTitleSubTitle from "../../components/ContainerTitleSubTitle";
import ContainerForm from "../../components/ContainerForm";
import InputForm from "../../components/InputForm";
import ButtonFormLink from "../../components/ButtonFormLink";
import AlertMessageError from "../../components/AlertMessageError";
import { COLORS, FONTS } from "../../styles/styles";
import { AntDesign } from "@expo/vector-icons";
import { RootStackParamList } from "../../navigation/AppNavigator";

export default function ForgotPasswordScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState("");
  const [messageError, setMessageError] = useState("");
  const [error, setError] = useState(false);

  const validateEmail = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setError(true);
      setMessageError("O e-mail é obrigatório.");
      return false;
    }

    if (!emailRegex.test(email)) {
      setError(true);
      setMessageError("Formato de e-mail inválido.");
      return false;
    }

    const responsibleData = await AsyncStorage.getItem(
      "@petguardian:responsibleData"
    );

    if (!responsibleData) {
      setError(true);
      setMessageError("Nenhuma conta cadastrada foi encontrada.");
      return false;
    }

    const responsible = JSON.parse(responsibleData);

    if (email.trim() !== responsible.email) {
      setError(true);
      setMessageError("E-mail não encontrado.");
      return false;
    }

    setError(false);
    setMessageError("");
    return true;
  };

  const handleSubmit = async () => {
    const isValid = await validateEmail();

    if (!isValid) return;

    await AsyncStorage.setItem(
      "@petguardian:passwordRecoveryEmail",
      email.trim()
    );

    navigation.navigate("ResetPasswordScreen");
  };

  return (
    <LayoutWrapper isDogPawBottomTop={true} justifyContent="center">
      <ContainerImage imagePath={require("../../assets/forgotPassword.png")} />

      <ContainerTitleSubTitle
        textTitle="Esqueceu sua senha?"
        textSubTitle={`Informe seu e-mail para\nredefinir sua senha`}
        fontFamilySubTitle={FONTS.poppins[600]}
        marginTop={20}
        marginBottom={20}
      />

      <ContainerForm>
        <InputForm
          label="E-mail"
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
          error={error}
          marginBottom={10}
        />

        {messageError.length > 0 && (
          <AlertMessageError message={messageError} />
        )}

        <ButtonFormLink
          onPress={handleSubmit}
          backgroundColor={COLORS.orange[900]}
          colorText={COLORS.white[300]}
          fontFamily={FONTS.poppins[700]}
          paddingVertical={7}
          marginTop={20}
          iconRight={
            <AntDesign
              name="arrow-right"
              size={26}
              color={COLORS.white[300]}
            />
          }
        >
          Enviar
        </ButtonFormLink>
      </ContainerForm>
    </LayoutWrapper>
  );
}