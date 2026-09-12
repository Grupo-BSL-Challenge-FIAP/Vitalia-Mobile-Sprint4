import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import LayoutWrapper from "../../components/LayoutWrapper";
import ContainerImage from "../../components/ContainerImage";
import ContainerTitleSubTitle from "../../components/ContainerTitleSubTitle";
import { COLORS, FONTS } from "../../styles/styles";
import ContainerForm from "../../components/ContainerForm";
import InputForm from "../../components/InputForm";
import ButtonFormLink from "../../components/ButtonFormLink";
import AlertMessageError from "../../components/AlertMessageError";
import { Feather } from "@expo/vector-icons";
import { RootStackParamList } from "../../navigation/AppNavigator";

export default function ResetPasswordScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [messageError, setMessageError] = useState("");

  const [errors, setErrors] = useState({
    password: false,
    confirmPassword: false,
  });

  const validateForm = () => {
    const newErrors = {
      password: false,
      confirmPassword: false,
    };

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;

    if (!password.trim()) {
      newErrors.password = true;
      setErrors(newErrors);
      setMessageError("A senha é obrigatória.");
      return false;
    }

    if (password.length < 8 || password.length > 20) {
      newErrors.password = true;
      setErrors(newErrors);
      setMessageError("A senha deve ter entre 8 e 20 caracteres.");
      return false;
    }

    if (!passwordRegex.test(password)) {
      newErrors.password = true;
      setErrors(newErrors);
      setMessageError("A senha deve conter pelo menos uma letra e um número.");
      return false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = true;
      setErrors(newErrors);
      setMessageError("As senhas não conferem.");
      return false;
    }

    setErrors(newErrors);
    setMessageError("");
    return true;
  };

  const handleResetPassword = async () => {
    const isValid = validateForm();

    if (!isValid) return;

    const recoveryEmail = await AsyncStorage.getItem(
      "@petguardian:passwordRecoveryEmail"
    );

    const responsibleData = await AsyncStorage.getItem(
      "@petguardian:responsibleData"
    );

    if (!recoveryEmail || !responsibleData) {
      setMessageError("Não foi possível localizar a conta.");
      return;
    }

    const responsible = JSON.parse(responsibleData);

    if (responsible.email !== recoveryEmail) {
      setMessageError("E-mail de recuperação inválido.");
      return;
    }

    const updatedResponsible = {
      ...responsible,
      password,
    };

    await AsyncStorage.setItem(
      "@petguardian:responsibleData",
      JSON.stringify(updatedResponsible)
    );

    await AsyncStorage.removeItem("@petguardian:passwordRecoveryEmail");

    navigation.navigate("LoginScreen");
  };

  return (
    <LayoutWrapper isDogPawBottomTop={true} justifyContent="center">
      <ContainerImage imagePath={require("../../assets/resetPassword.png")} />

      <ContainerTitleSubTitle
        textTitle="Digite sua nova senha"
        textSubTitle={`Dica: guarde sua nova senha\ncom cuidado.`}
        fontFamilySubTitle={FONTS.poppins[600]}
        marginTop={20}
        marginBottom={20}
      />

      <ContainerForm>
        <InputForm
          label="Nova senha:"
          placeholder="Crie uma nova senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          error={errors.password}
        />

        <InputForm
          label="Confirme sua senha:"
          placeholder="Repita a nova senha"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          error={errors.confirmPassword}
          marginBottom={10}
        />

        {messageError.length > 0 && (
          <AlertMessageError message={messageError} />
        )}

        <ButtonFormLink
          onPress={handleResetPassword}
          backgroundColor={COLORS.orange[900]}
          colorText={COLORS.white[100]}
          borderWidth={2}
          paddingVertical={8}
          iconRight={
            <Feather name="refresh-ccw" size={32} color={COLORS.white[100]} />
          }
        >
          Redefinir senha
        </ButtonFormLink>
      </ContainerForm>
    </LayoutWrapper>
  );
}