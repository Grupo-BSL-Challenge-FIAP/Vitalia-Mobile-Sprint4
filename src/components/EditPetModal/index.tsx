import { Alert, Image, Modal, Text, TextInput, TouchableOpacity, View, } from "react-native";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { COLORS, FONTS } from "../../styles/styles";
import { PetResponse } from "../../services/petService";
import { useUpdatePet } from "../../hooks/useUpdatePet";
import { useSpecies } from "../../hooks/useSpecies";
import { useBreeds } from "../../hooks/useBreeds";
import { useImages } from "../../contexts/ImageContext";
import * as ImagePicker from "expo-image-picker";
import { uploadImageToCloudinary } from "../../services/cloudinaryService";

interface EditPetModalProps {
  visible: boolean;
  pet: PetResponse;
  onClose: () => void;
}

export default function EditPetModal({visible, pet, onClose,}: EditPetModalProps) {

  const updatePetMutation = useUpdatePet();
  const { getPetImage, savePetImage } = useImages();
  const { data: speciesList = [], isLoading: isLoadingSpecies,} = useSpecies();
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [ selectedSpeciesId, setSelectedSpeciesId,] = useState<number | null>(null);
  const [ selectedBreedId, setSelectedBreedId,] = useState<number | null>(null);
  const [birthDate, setBirthDate] = useState("");
  const [weight, setWeight] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { data: breedList = [], isLoading: isLoadingBreeds,} = useBreeds(selectedSpeciesId);

  const formatDateToMobile = (date?: string,) => {
    if (!date) {
      return "";
    }

    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const formatDateToApi = ( date: string,) => {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  };

  const handlePickImage = async () => {
    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri,);
    }
  };

  useEffect(() => {
    if (visible) {
      setName(pet.name);
      setSex(pet.sex);
      setSelectedSpeciesId(pet.speciesId,);
      setSelectedBreedId(pet.breedId,);
      setBirthDate(formatDateToMobile(pet.birthDate,));
      setWeight(String(pet.weightKg));
      setSelectedImage(null);
    }
  }, [visible, pet]);

  const handleSpeciesChange = (speciesId: number | null,) => {
    setSelectedSpeciesId(speciesId,);

    // Ao trocar a espécie, a raça
    // anterior deixa de ser válida.
    setSelectedBreedId(null);
  };

  const handleSave = async () => {
    if (
      !name.trim() ||
      !sex.trim() ||
      !birthDate.trim() ||
      !weight.trim()
    ) {
      Alert.alert(
        "Dados incompletos",
        "Preencha os campos obrigatórios do pet.",
      );

      return;
    }

    if (!selectedSpeciesId) {
      Alert.alert(
        "Espécie obrigatória",
        "Selecione uma espécie.",
      );

      return;
    }

    if (!selectedBreedId) {
      Alert.alert(
        "Raça obrigatória",
        "Selecione uma raça.",
      );

      return;
    }

    const parsedWeight = Number(weight.replace(",", "."));

    if (Number.isNaN(parsedWeight) || parsedWeight <= 0) {
      Alert.alert(
        "Peso inválido",
        "Informe um peso válido.",
      );

      return;
    }

    try {
      if (selectedImage) {
        const imageUrl = await uploadImageToCloudinary(selectedImage);
        await savePetImage(pet.id, imageUrl);
      }
    } catch (error) {
      console.error(
        "Erro ao enviar imagem do pet para o Cloudinary:",
        error,
      );
      return;
    }

    updatePetMutation.mutate({
        id: pet.id,
        data: {
          name: name.trim(),
          sex: sex.trim(),
          birthDate:formatDateToApi(birthDate,),
          weightKg: parsedWeight,
          status: pet.status,
          breedId: selectedBreedId,
        },
      },
      {
        onSuccess: () => {
          onClose();
        },

        onError: (error) => {
          console.error(
            "Erro ao atualizar pet:",
            error,
          );

          Alert.alert(
            "Erro",
            "Não foi possível atualizar as informações do pet.",
          );
        },
      },
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.55)",
          justifyContent: "center",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            backgroundColor:
            COLORS.white[100],
            borderRadius: 12,
            paddingHorizontal: 25,
            paddingVertical: 25,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <Text
              style={{
                fontFamily:
                FONTS.inter[700],
                fontSize: 23,
                color: COLORS.orange[900],
              }}
            >
              Editar pet
            </Text>

            <TouchableOpacity
              onPress={onClose}
              style={{
                position: "absolute",
                right: 0,
              }}
            >
              <AntDesign name="close-circle" size={24} color={COLORS.orange[900]} />
            </TouchableOpacity>
          </View>

          {/* FOTO */}

          <View
            style={{
              alignItems: "center",
              marginBottom: 27
            }}
          >
            <View>
                <View
                    style={{
                      boxShadow: '1px 4px 10px 4px rgba(0, 0, 0, 0.25)',
                      borderRadius: 10,
                    }}
                  >
              <Image
                source={
                  selectedImage
                    ? { uri: selectedImage }
                    : getPetImage(
                        pet.speciesId,
                        pet.sex,
                        undefined,
                        pet.id,
                      )
                }
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 10,
                }}
              />
              </View>

              <TouchableOpacity
                onPress={handlePickImage}
                style={{
                    position: "absolute",
                    bottom: -12,
                    right: -10,
                    width: 30,
                    height: 30,
                    borderRadius: 20,
                    backgroundColor: COLORS.orange[900],
                    borderWidth: 1,
                    borderColor: COLORS.white[100],
                    justifyContent: "center",
                    alignItems: "center",
                }}
              >
                <AntDesign
                  name="edit"
                  size={20}
                  color={
                    COLORS.white[100]
                  }
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* NOME */}

          <Text
            style={{
              fontFamily:
              FONTS.inter[600],
              color: COLORS.orange[900],
              marginBottom: 5,
            }}
          >
            Nome
          </Text>

          <TextInput
            value={name}
            onChangeText={setName}
            style={{
              backgroundColor: COLORS.white[500],
              borderWidth: 1,
              borderBottomWidth: 1,
              borderColor: COLORS.orange[210],
              borderRadius: 9,  
              paddingHorizontal: 12,
              paddingVertical: 10,
              marginBottom: 22,
              fontFamily: FONTS.inter[400],
              fontSize: 17,
              color: COLORS.orange[900],
            }}
          />

          {/* SEXO */}

          <Text
            style={{
              fontFamily:
              FONTS.inter[700],
              color:
              COLORS.orange[900],
              marginBottom: 5,
            }}
          >
            Sexo biológico
          </Text>

          <TextInput
            value={sex}
            onChangeText={setSex}
            style={{
              backgroundColor: COLORS.white[500],
              borderWidth: 1,
              borderBottomWidth: 1,
              borderColor: COLORS.orange[210],
              borderRadius: 9,  
              paddingHorizontal: 12,
              paddingVertical: 10,
              marginBottom: 22,
              fontFamily: FONTS.inter[400],
              fontSize: 17,
              color: COLORS.orange[900],
            }}
          />

          {/* ESPÉCIE */}

          <Text
            style={{
              fontFamily:
              FONTS.inter[700],
              color:
              COLORS.orange[900],
              marginBottom: 5,
            }}
          >
            Espécie
          </Text>

          <View
            style={{
              backgroundColor: COLORS.white[500],
              borderWidth: 1,
              borderBottomWidth: 1,
              borderColor: COLORS.orange[210],
              borderRadius: 9,  
              paddingHorizontal: 4,
              paddingVertical: 0,
              marginBottom: 22,
            }}
          >
            <Picker
              selectedValue={selectedSpeciesId}
              enabled={!isLoadingSpecies}
              onValueChange={(value,) => handleSpeciesChange(value,)}
            >
              <Picker.Item
                label={
                  isLoadingSpecies
                    ? "Carregando..."
                    : "Selecione a espécie"
                }
                value={null}
              />

              {speciesList.map(
                (species) => (
                  <Picker.Item
                    key={species.id}
                    label={species.name}
                    value={species.id}
                  />
                ),
              )}
            </Picker>
          </View>

          {/* RAÇA */}

          <Text
            style={{
              fontFamily:
              FONTS.inter[700],
              color:
              COLORS.orange[900],
              marginBottom: 5,
            }}
          >
            Raça
          </Text>

          <View
            style={{
              backgroundColor: COLORS.white[500],
              borderWidth: 1,
              borderBottomWidth: 1,
              borderColor: COLORS.orange[210],
              borderRadius: 9,  
              paddingHorizontal: 4,
              paddingVertical: 0,
              marginBottom: 22,
            }}
          >
            <Picker
              selectedValue={selectedBreedId}
              enabled={ selectedSpeciesId !== null && !isLoadingBreeds}
              onValueChange={(value) => setSelectedBreedId(value)
              }
            >
              <Picker.Item
                label={
                  !selectedSpeciesId
                    ? "Selecione primeiro a espécie"
                    : isLoadingBreeds
                      ? "Carregando..."
                      : "Selecione a raça"
                }
                value={null}
              />

              {breedList.map(
                (breed) => (
                  <Picker.Item
                    key={breed.id}
                    label={breed.name}
                    value={breed.id}
                  />
                ),
              )}
            </Picker>
          </View>

          {/* DATA */}

          <Text
            style={{
              fontFamily:
              FONTS.inter[700],
              color:
              COLORS.orange[900],
              marginBottom: 5,
            }}
          >
            Data de Nascimento
          </Text>

          <TextInput
            value={birthDate}
            onChangeText={setBirthDate}
            placeholder="dd/mm/aaaa"
            style={{
              backgroundColor: COLORS.white[500],
              borderWidth: 1,
              borderBottomWidth: 1,
              borderColor: COLORS.orange[210],
              borderRadius: 9,  
              paddingHorizontal: 12,
              paddingVertical: 10,
              marginBottom: 22,
              fontFamily: FONTS.inter[400],
              fontSize: 17,
              color: COLORS.orange[900],
            }}
          />

          {/* PESO */}

          <Text
            style={{
              fontFamily:
              FONTS.inter[700],
              color:
              COLORS.orange[900],
              marginBottom: 5,
            }}
          >
            Peso
          </Text>

          <TextInput
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
            style={{
              backgroundColor: COLORS.white[500],
              borderWidth: 1,
              borderBottomWidth: 1,
              borderColor: COLORS.orange[210],
              borderRadius: 9,  
              paddingHorizontal: 12,
              paddingVertical: 10,
              marginBottom: 22,
              fontFamily: FONTS.inter[400],
              fontSize: 17,
              color: COLORS.orange[900],
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >

            {/* CANCELAR */}
            <TouchableOpacity
                onPress={onClose}
                disabled={updatePetMutation.isPending}
                style={{

                  borderRadius: 7,
                  alignItems: "center",
                  justifyContent: 'center',
                  opacity: updatePetMutation.isPending ? 0.6 : 1,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS.inter[700],
                    paddingVertical: 8,
                    paddingHorizontal: 32,
                    fontSize: 17,
                    color: COLORS.orange[900],
                    borderWidth: 2,
                    borderColor: COLORS.orange[900],
                    borderRadius: 5,
                  }}
                >
                  Cancelar
                </Text>
            </TouchableOpacity>

            {/* SALVAR */}
            <TouchableOpacity
              onPress={handleSave}
              disabled={updatePetMutation.isPending}
              style={{
                backgroundColor: COLORS.orange[900],
                paddingVertical: 9,
                paddingHorizontal: 42,
                borderRadius: 7,
                alignItems: "center",
                justifyContent: 'center',
                opacity: updatePetMutation.isPending ? 0.6 : 1,
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.inter[700],
                  fontSize: 17,
                  color: COLORS.white[100],
                }}
              >
                {updatePetMutation.isPending
                  ? "Salvando..."
                  : "Salvar"}
              </Text>
            </TouchableOpacity>
         </View>
        </View>
      </View>
    </Modal>
  );
}