import { View } from "react-native";
import LayoutWrapper from "../../components/LayoutWrapper";
import Header from "../../components/Header";
import CardProfileUser from "../../components/CardProfileUser";

export default function AccountUserScreen() {
  return (
    <LayoutWrapper paddingHorizontal={-1} paddingBottom={80}>
      <Header isBackBottom={false} textHeader="Perfil" />

      <View
        style={{
          paddingHorizontal: 12,
          marginTop: 20,
          gap: 30,
        }}
      >
        <CardProfileUser />
      </View>
    </LayoutWrapper>
  );
}