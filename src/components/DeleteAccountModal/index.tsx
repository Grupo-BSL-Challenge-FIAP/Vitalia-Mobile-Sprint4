import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../styles/styles";
import { useDeleteCurrentUser } from "../../hooks/useDeleteCurrentUser";
import { useAuth } from "../../contexts/AuthContext";
import { queryClient } from "../../api/queryClient";

interface DeleteAccountModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function DeleteAccountModal({
  visible,
  onClose,
}: DeleteAccountModalProps) {
  const deleteAccountMutation = useDeleteCurrentUser();

  const { logout } = useAuth();

  const handleDeleteAccount = () => {
    if (deleteAccountMutation.isPending) {
      return;
    }

    deleteAccountMutation.mutate(undefined, {
      onSuccess: async () => {
        try {
          await AsyncStorage.removeItem("@petguardian:activePetId");

          queryClient.clear();

          await logout();

          onClose();
        } catch (error) {
          console.error("Erro após excluir conta:", error);
        }
      },

onError: (error: any) => {
  console.error(
    "STATUS DELETE:",
    error?.response?.status,
  );

  console.error(
    "RESPOSTA DELETE:",
    error?.response?.data,
  );

  console.error(
    "HEADERS DELETE:",
    error?.config?.headers,
  );

  console.error(
    "URL DELETE:",
    `${error?.config?.baseURL}${error?.config?.url}`,
  );

  Alert.alert(
    "Erro",
    "Não foi possível excluir sua conta.",
  );
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
            borderRadius: 15,
            paddingHorizontal: 22,
            paddingVertical: 25,
          }}
        >

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 25,
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.inter[700],
                fontSize: 22,
                color: COLORS.red[600],
              }}
            >
              Excluir conta?
            </Text>

            <TouchableOpacity
              onPress={onClose}
              disabled={deleteAccountMutation.isPending}
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
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: COLORS.red[300],
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <MaterialCommunityIcons
                name="delete-outline"
                size={45}
                color={COLORS.red[600]}
              />
            </View>

            <Text
              style={{
                fontFamily: FONTS.inter[700],
                fontSize: 17,
                color: COLORS.orange[900],
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Tem certeza que deseja excluir sua conta?
            </Text>

            <Text
              style={{
                fontFamily: FONTS.inter[400],
                fontSize: 14,
                color: COLORS.orange[900],
                textAlign: "center",
                lineHeight: 20,
              }}
            >
              Esta ação é permanente. Seus dados serão excluídos e não poderão
              ser recuperados.
            </Text>
          </View>


          <View
            style={{
              flexDirection: "row",
              gap: 12,
              marginTop: 15,
            }}
          >
            <TouchableOpacity
              onPress={onClose}
              disabled={deleteAccountMutation.isPending}
              style={{
                flex: 1,
                paddingVertical: 11,
                borderWidth: 2,
                borderColor: COLORS.orange[900],
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.inter[700],
                  fontSize: 15,
                  color: COLORS.orange[900],
                }}
              >
                Cancelar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleDeleteAccount}
              disabled={deleteAccountMutation.isPending}
              style={{
                flex: 1,
                paddingVertical: 11,
                backgroundColor: COLORS.red[600],
                borderRadius: 8,
                alignItems: "center",
                opacity: deleteAccountMutation.isPending ? 0.6 : 1,
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.inter[700],
                  fontSize: 15,
                  color: COLORS.white[100],
                }}
              >
                {deleteAccountMutation.isPending
                  ? "Excluindo..."
                  : "Excluir conta"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}