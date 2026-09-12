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
import AlertMessageError from "../../components/AlertMessageError";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import axios from "axios";

import { useLogin } from "../../hooks/useLogin";

export default function LoginScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const loginMutation = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [messageError, setMessageError] = useState("");

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const validateLogin = () => {
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

    setErrors(newErrors);
    setMessageError("");

    return true;
  };

  const handleLogin = () => {
    if (loginMutation.isPending) {
      return;
    }

    const isValid = validateLogin();

    if (!isValid) {
      return;
    }

    loginMutation.mutate(
      {
        email: email.trim(),
        password,
      },
      {
        onSuccess: (data) => {
          console.log("Login realizado com sucesso:", data);

          setErrors({
            email: false,
            password: false,
          });

          setMessageError("");

          navigation.reset({
            index: 0,
            routes: [
              {
                name: "TabsDashboardResponsible",
              },
            ],
          });
        },

        onError: (error) => {
          console.error("Erro ao realizar login:", error);

          setErrors({
            email: true,
            password: true,
          });

          if (axios.isAxiosError(error)) {
            console.error("Status:", error.response?.status);
            console.error(
              "Resposta da API:",
              error.response?.data,
            );

            const status = error.response?.status;

            if (
              status === 400 ||
              status === 401 ||
              status === 403 ||
              status === 404
            ) {
              setMessageError(
                "E-mail ou senha incorretos.",
              );

              return;
            }

            if (!error.response) {
              setMessageError(
                "Não foi possível conectar ao servidor. Tente novamente.",
              );

              return;
            }
          }

          setMessageError(
            "Não foi possível realizar o login. Tente novamente.",
          );
        },
      },
    );
  };

  return (
    <LayoutWrapper isDogPawBottomTop={true}>
      <ContainerImage
        imagePath={require("../../assets/logo_vitalia_2.png")}
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
          onChangeText={(text) => {
            setEmail(text);

            if (errors.email) {
              setErrors((previous) => ({
                ...previous,
                email: false,
              }));
            }
          }}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <InputForm
          label="Senha: "
          placeholder="Digite sua senha"
          marginBottom={10}
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);

            if (errors.password) {
              setErrors((previous) => ({
                ...previous,
                password: false,
              }));
            }
          }}
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
          {loginMutation.isPending
            ? "Entrando..."
            : "Entrar"}
        </ButtonFormLink>
      </ContainerForm>
    </LayoutWrapper>
  );
}