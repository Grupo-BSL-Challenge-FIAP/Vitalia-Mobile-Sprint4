import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "../../contexts/AuthContext";
import { queryClient } from "../../api/queryClient";
import { COLORS, FONTS } from "../../styles/styles";

interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function LogoutModal({ visible, onClose }: LogoutModalProps) {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("@petguardian:activePetId");

      await logout();

      queryClient.clear();

      onClose();
    } catch (error) {
      console.error("Erro ao sair da conta:", error);

      Alert.alert("Erro", "Não foi possível sair da conta. Tente novamente.");
    }
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
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 25,
        }}
      >
        <View
          style={{
            width: "100%",
            backgroundColor: COLORS.white[100],
            borderRadius: 20,
            paddingHorizontal: 24,
            paddingVertical: 28,
            alignItems: "center",
          }}
        >
          {/* ÍCONE */}

          <View
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              backgroundColor: COLORS.orange[100],
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 18,
            }}
          >
            <MaterialCommunityIcons
              name="logout"
              size={36}
              color={COLORS.orange[900]}
            />
          </View>


          <Text
            style={{
              fontFamily: FONTS.inter[700],
              fontSize: 22,
              color: COLORS.orange[900],
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Sair da conta
          </Text>


          <Text
            style={{
              fontFamily: FONTS.inter[400],
              fontSize: 15,
              color: COLORS.orange[875],
              textAlign: "center",
              lineHeight: 22,
              marginBottom: 25,
            }}
          >
            Tem certeza que deseja sair da sua conta?
          </Text>


          <View
            style={{
              width: "100%",
              flexDirection: "row",
              gap: 10,
            }}
          >
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.8}
              style={{
                flex: 1,
                height: 48,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: COLORS.orange[900],
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.white[100],
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
              onPress={handleLogout}
              activeOpacity={0.8}
              style={{
                flex: 1,
                height: 48,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.orange[900],
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 7,
                }}
              >
                <MaterialCommunityIcons
                  name="logout"
                  size={20}
                  color={COLORS.white[100]}
                />

                <Text
                  style={{
                    fontFamily: FONTS.inter[700],
                    fontSize: 15,
                    color: COLORS.white[100],
                  }}
                >
                  Sair
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}