import { Alert, Image, Modal, Text, TouchableOpacity, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../styles/styles";
import { useDeleteCurrentUser } from "../../hooks/useDeleteCurrentUser";
import { useAuth } from "../../contexts/AuthContext";
import { queryClient } from "../../api/queryClient";
import { useImages } from "../../contexts/ImageContext";
import { useCurrentUser } from "../../hooks/useCurrentUser";

interface DeleteAccountModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function DeleteAccountModal({
  visible,
  onClose,
}: DeleteAccountModalProps) {
  const deleteAccountMutation = useDeleteCurrentUser();
  const { getUserImage } = useImages();
  const { data: user } = useCurrentUser();

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
                fontSize: 24,
                color: COLORS.orange[900],
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
              <AntDesign
                name="close-circle"
                size={30}
                color={COLORS.orange[900]}
              />
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
              <View
                style={{
                  boxShadow: '1px 4px 10px 4px rgba(0, 0, 0, 0.25)',
                  borderRadius: 10,
                }}
              >
                <Image
                  source={getUserImage(
                    undefined,
                    undefined,
                    user?.id,
                  )}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 10,
                  }}
                />
              </View>
            </View>

            <Text
              style={{
                fontFamily: FONTS.inter[400],
                fontSize: 24,
                color: COLORS.orange[900],
                textAlign: "center",
                marginVertical: 10,
              }}
            >
              {user?.fullName ?? "Usuário"}
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
              Sua conta será excluída. Caso queira recuperá-la, entre em contato com: vitaliabsl1@gmail.com.
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
                paddingVertical: 10,
                borderWidth: 2,
                borderColor: COLORS.red[700],
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.inter[700],
                  fontSize: 15,
                  color: COLORS.red[700],
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
                paddingVertical: 10,
                backgroundColor: COLORS.red[700],
                borderRadius: 8,
                alignItems: "center",
                justifyContent: 'center',
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