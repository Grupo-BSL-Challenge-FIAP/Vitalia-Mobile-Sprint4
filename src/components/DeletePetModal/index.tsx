import { Alert, Image, Modal, Text, TouchableOpacity, View, } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../styles/styles";
import { PetResponse } from "../../services/petService";
import { useDeletePet } from "../../hooks/useDeletePet";

interface DeletePetModalProps {
  visible: boolean;
  pet: PetResponse;
  onClose: () => void;
  onDeleted: () => void;
}

export default function DeletePetModal({
  visible,
  pet,
  onClose,
  onDeleted,
}: DeletePetModalProps) {
  const deletePetMutation = useDeletePet();

  const handleDelete = () => {
    if (deletePetMutation.isPending) {
      return;
    }

    deletePetMutation.mutate(pet.id, {
      onSuccess: async () => {
        const activePetId = await AsyncStorage.getItem(
          "@petguardian:activePetId",
        );

        if (activePetId && Number(activePetId) === pet.id) {
          await AsyncStorage.removeItem("@petguardian:activePetId");
        }

        onClose();
        onDeleted();

        Alert.alert("Pet removido", "O pet foi removido com sucesso.");
      },

      onError: (error) => {
        console.error("Erro ao remover pet:", error);

        Alert.alert("Erro", "Não foi possível remover o pet.");
      },
    });
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
          alignItems: "center",
          paddingHorizontal: 30,
        }}
      >
        <View
          style={{
            width: "100%",
            backgroundColor: COLORS.white[100],
            borderRadius: 12,
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.inter[700],
                fontSize: 22,
                color: COLORS.orange[900],
              }}
            >
              Remover pet?
            </Text>

            <TouchableOpacity
              onPress={onClose}
              disabled={deletePetMutation.isPending}
              style={{
                position: "absolute",
                right: 0,
              }}
            >
              <AntDesign name="close-circle" size={30} color="black" />
            </TouchableOpacity>
          </View>

          <View
            style={{
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Image
              source={require("../../assets/dogPaws.png")}
              style={{
                width: 100,
                height: 100,
                borderRadius: 10,
                marginBottom: 10,
              }}
            />

            <Text
              style={{
                fontFamily: FONTS.inter[500],
                color: COLORS.orange[900],
                fontSize: 20,
                marginBottom: 10,
              }}
            >
              {pet.name}
            </Text>

            <Text
              style={{
                fontFamily: FONTS.inter[400],
                color: COLORS.gray[100],
                fontSize: 14,
              }}
            >
              O registro e as informações deste pet serão excluídos
              permanentemente e não poderão ser recuperados.
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 20,
            }}
          >
            <TouchableOpacity
              onPress={onClose}
              disabled={deletePetMutation.isPending}
              style={{
                flex: 1,
                borderWidth: 2,
                borderColor: COLORS.red[700],
                paddingVertical: 10,
                borderRadius: 6,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.inter[700],
                  color: COLORS.red[700],
                }}
              >
                Cancelar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleDelete}
              disabled={deletePetMutation.isPending}
              style={{
                flex: 1,
                backgroundColor: COLORS.red[700],
                paddingVertical: 10,
                borderRadius: 6,
                alignItems: "center",
                opacity: deletePetMutation.isPending ? 0.6 : 1,
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.inter[700],
                  color: COLORS.white[100],
                }}
              >
                {deletePetMutation.isPending ? "Removendo..." : "Remover"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}