import { TouchableOpacity, View } from "react-native";
import { COLORS, FONTS } from "../../styles/styles";
import { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import LogoutModal from "../LogoutModal";
import DeleteAccountModal from "../DeleteAccountModal";
import EditUserModal from "../EditUserModal";
import TitleOrange from "../TitleOrange";
import SubTitleOrange from "../SubTitleOrange";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useTheme } from "../../contexts/ThemeContext";

export default function CardAccountUser() {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] =
    useState(false);

  const { data: user } = useCurrentUser();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { isDarkMode, toggleTheme } = useTheme();

  const iconColor = isDarkMode
    ? COLORS.white[100]
    : COLORS.orange[900];

  return (
    <>
      <View
        style={{
          marginHorizontal: 10,
          gap: 12,
        }}
      >
        <TitleOrange
          title="Conta"
          color={COLORS.orange[900]}
          fontFamily={FONTS.inter[700]}
          fontSize={20}
          marginLeft={-10}
        />

        <View
          style={{
            paddingVertical: 20,
            paddingHorizontal: 15,
            borderWidth: 1,
            borderRadius: 15,
            borderColor: COLORS.orange[970],
            boxShadow: "0px 5px 7px rgba(0, 0, 0, 0.20)",
            gap: 15,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (user) setEditModalVisible(true);
            }}
            activeOpacity={0.8}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.orange[950],
              paddingBottom: 10,
            }}
          >
            <AntDesign
              name="edit"
              size={24}
              color={iconColor}
            />

            <SubTitleOrange
              title="Editar Informações"
              color={COLORS.orange[900]}
              fontFamily={FONTS.inter[600]}
              fontSize={12}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setLogoutModalVisible(true)}
            activeOpacity={0.8}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.orange[950],
              paddingBottom: 10,
            }}
          >
            <Feather
              name="log-out"
              size={24}
              color={iconColor}
            />

            <SubTitleOrange
              title="Sair da conta"
              color={COLORS.orange[900]}
              fontFamily={FONTS.inter[600]}
              fontSize={12}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("AboutApplicationScreen")}
            activeOpacity={0.8}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.orange[950],
              paddingBottom: 10,
            }}
          >
            <AntDesign
              name="info-circle"
              size={23}
              color={iconColor}
            />

            <SubTitleOrange
              title="Sobre o Aplicativo"
              color={COLORS.orange[900]}
              fontFamily={FONTS.inter[600]}
              fontSize={12}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={toggleTheme}
            activeOpacity={0.8}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.orange[950],
              paddingBottom: 10,
            }}
          >
            <Feather
              name={isDarkMode ? "sun" : "moon"}
              size={24}
              color={iconColor}
            />

            <SubTitleOrange
              title={
                isDarkMode ? "Desativar modo escuro" : "Ativar modo escuro"
              }
              color={COLORS.orange[900]}
              fontFamily={FONTS.inter[600]}
              fontSize={12}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setDeleteAccountModalVisible(true)}
            activeOpacity={0.8}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Feather
              name="trash-2"
              size={24}
              color={COLORS.red[800]}
            />

            <SubTitleOrange
              title="Excluir Conta"
              color={COLORS.red[800]}
              fontFamily={FONTS.inter[600]}
              fontSize={12}
            />
          </TouchableOpacity>
        </View>
      </View>

      {user && (
        <EditUserModal
          visible={editModalVisible}
          user={user}
          onClose={() => setEditModalVisible(false)}
        />
      )}

      <LogoutModal
        visible={logoutModalVisible}
        onClose={() => setLogoutModalVisible(false)}
      />

      <DeleteAccountModal
        visible={deleteAccountModalVisible}
        onClose={() => setDeleteAccountModalVisible(false)}
      />
    </>
  );
}
