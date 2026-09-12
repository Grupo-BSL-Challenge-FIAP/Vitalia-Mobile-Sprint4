import { View } from "react-native";
import ContainerTitleSubTitle from "../ContainerTitleSubTitle";
import ContainerForm from "../ContainerForm";
import InputForm from "../InputForm";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../styles/styles";
import ButtonFormLink from "../ButtonFormLink";
import { useState } from "react";
import AlertMessageError from "../AlertMessageError";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

export default function FormPet() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [weight, setWeight] = useState("");
  const [messageError, setMessageError] = useState("");

  const [errors, setErrors] = useState({
    name: false,
    species: false,
    breed: false,
    gender: false,
    birthDate: false,
    weight: false,
  });

  const handleBirthDateChange = (text: string) => {
    let cleaned = text.replace(/\D/g, "");

    cleaned = cleaned.slice(0, 8);

    if (cleaned.length > 4) {
      cleaned = cleaned.replace(/(\d{2})(\d{2})(\d{1,4})/, "$1/$2/$3");
    } else if (cleaned.length > 2) {
      cleaned = cleaned.replace(/(\d{2})(\d{1,2})/, "$1/$2");
    }

    setBirthDate(cleaned);
  };

  const handleWeightChange = (text: string) => {
    let cleaned = text.replace(/[^0-9.,]/g, "");

    cleaned = cleaned.replace(",", ".");

    setWeight(cleaned);
  };

  const validateForm = () => {
    const newErrors = {
      name: false,
      species: false,
      breed: false,
      gender: false,
      birthDate: false,
      weight: false,
    };

    const birthDateParts = birthDate.split("/");
    const day = Number(birthDateParts[0]);
    const month = Number(birthDateParts[1]);
    const year = Number(birthDateParts[2]);
    const parsedBirthDate = new Date(year, month - 1, day);
    const today = new Date();

    if (!name.trim()) {
      newErrors.name = true;
      setErrors(newErrors);
      setMessageError("O nome do pet é obrigatório.");
      return false;
    }

    if (name.trim().length < 2 || name.trim().length > 50) {
      newErrors.name = true;
      setErrors(newErrors);
      setMessageError("O nome do pet deve ter entre 2 e 50 caracteres.");
      return false;
    }

    if (!species.trim()) {
      newErrors.species = true;
      setErrors(newErrors);
      setMessageError("A espécie é obrigatória.");
      return false;
    }

    if (!breed.trim()) {
      newErrors.breed = true;
      setErrors(newErrors);
      setMessageError("A raça é obrigatória.");
      return false;
    }

    if (!gender.trim()) {
      newErrors.gender = true;
      setErrors(newErrors);
      setMessageError("O sexo biológico é obrigatório.");
      return false;
    }

    if (!birthDate.trim()) {
      newErrors.birthDate = true;
      setErrors(newErrors);
      setMessageError("A data de nascimento é obrigatória.");
      return false;
    }

    if (
      birthDate.length !== 10 ||
      parsedBirthDate.getDate() !== day ||
      parsedBirthDate.getMonth() !== month - 1 ||
      parsedBirthDate.getFullYear() !== year ||
      parsedBirthDate >= today
    ) {
      newErrors.birthDate = true;
      setErrors(newErrors);
      setMessageError(
        "A data de nascimento deve ser válida e estar no passado.",
      );
      return false;
    }

    if (!weight.trim()) {
      newErrors.weight = true;
      setErrors(newErrors);
      setMessageError("O peso é obrigatório.");
      return false;
    }

    if (Number(weight) <= 0 || Number.isNaN(Number(weight))) {
      newErrors.weight = true;
      setErrors(newErrors);
      setMessageError("O peso deve ser um valor positivo.");
      return false;
    }

    setErrors(newErrors);
    setMessageError("");
    return true;
  };

  const saveDataPetData = async () => {
    try {
      const petsStorage = await AsyncStorage.getItem("@petguardian:petsData");

      const pets = petsStorage ? JSON.parse(petsStorage) : [];

      const petData = {
        id: Date.now(),
        name,
        species,
        breed,
        gender,
        birthDate,
        weight,
        image: "dogPaws",
      };

      const updatedPets = [...pets, petData];

      await AsyncStorage.setItem(
        "@petguardian:petsData",
        JSON.stringify(updatedPets),
      );

      await AsyncStorage.setItem(
        "@petguardian:activePetId",
        String(petData.id),
      );

      console.log("Pets salvos:", updatedPets);
    } catch (error) {
      setMessageError("Ocorreu um erro ao salvar os dados. Tente novamente.");
    }
  };

  const handleFormSubmit = async () => {
    const isValid = validateForm();

    if (!isValid) return;

    await saveDataPetData();

    navigation.navigate("AccountCreationConfirmationScreen");
  };

  return (
    <View
      style={{
        flex: 1,
        gap: 30,
        paddingTop: 30,
      }}
    >
      <ContainerTitleSubTitle
        alignItems="center"
        textTitle={`Agora insira os\ndados do seu pet:`}
        textSubTitle="Campos marcados com * são obrigatórios."
        fontSizeSubTitle={15}
      />

      <ContainerForm>
        <InputForm
          label="Nome *"
          placeholder="Digite o nome do pet"
          value={name}
          onChangeText={setName}
          error={errors.name}
        />

        <InputForm
          label="Espécie *"
          placeholder="Ex: Cão, Gato, etc."
          value={species}
          onChangeText={setSpecies}
          error={errors.species}
        />

        <InputForm
          label="Raça *"
          placeholder="Ex: Labrador, Siamês, etc."
          value={breed}
          onChangeText={setBreed}
          error={errors.breed}
        />

        <InputForm
          label="Sexo Biológico *"
          placeholder="Ex: Macho, Fêmea"
          value={gender}
          onChangeText={setGender}
          error={errors.gender}
        />

        <InputForm
          label="Data de nascimento *"
          placeholder="dd/mm/aaaa"
          value={birthDate}
          onChangeText={handleBirthDateChange}
          error={errors.birthDate}
          icon={
            <FontAwesome
              name="calendar-o"
              size={24}
              color={COLORS.orange[900]}
            />
          }
        />

        <InputForm
          label="Peso *"
          placeholder="Digite o peso do pet"
          value={weight}
          onChangeText={handleWeightChange}
          keyboardType="decimal-pad"
          error={errors.weight}
          marginBottom={10}
        />

        {messageError.length > 0 && (
          <AlertMessageError message={messageError} />
        )}

        <View
          style={{
            marginTop: 50,
          }}
        >
          <ButtonFormLink
            onPress={handleFormSubmit}
            backgroundColor={COLORS.orange[900]}
            colorText={COLORS.white[300]}
            fontFamily={FONTS.poppins[700]}
            paddingVertical={7}
            iconRight={
              <AntDesign
                name="arrow-right"
                size={26}
                color={COLORS.white[300]}
              />
            }
          >
            Continuar
          </ButtonFormLink>
        </View>
      </ContainerForm>
    </View>
  );
}
