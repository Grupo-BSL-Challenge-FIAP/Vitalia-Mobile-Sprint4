import { ScrollView, Text, View } from "react-native";
import LayoutWrapper from "../../components/LayoutWrapper";
import YourPets from "../../components/YourPets";
import StatusPet from "../../components/StatusPet";
import ContainerInsights from "../../components/ContainerInsights";

export default function DashboardResponsibleScreen() {
  return (
    <LayoutWrapper paddingHorizontal={-1} isHeaderDashboardResponsible={true} paddingBottom={50}>
      <View
        style={{
          paddingHorizontal: 15,
          marginTop: 20,
          gap: 30
        }}
      >
          <YourPets />
          <StatusPet />
          <ContainerInsights />
      </View>
    </LayoutWrapper>
  );
}