import { View } from "react-native";
import LayoutWrapper from "../../components/LayoutWrapper";
import Header from "../../components/Header";
import TitleOrange from "../../components/TitleOrange";
import { COLORS, FONTS } from "../../styles/styles";
import Feather from "@expo/vector-icons/Feather";
import CardHeartbeatPet from "../../components/CardHeartbeatPet";
import ButtonLink from "../../components/ButtonLink";
import ContainerAddPet from "../../components/ContainerAddPet";

export default function AllPetsScreen() {
  return (
    <>
      <LayoutWrapper paddingHorizontal={-1} paddingBottom={80}>
        <Header textHeader="Pets" isBackBottom={true} />
        <View
          style={{
            paddingHorizontal: 15,
            marginTop: 20,
            gap: 30,
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TitleOrange
              title="Seus pets"
              fontFamily={FONTS.inter[700]}
              fontSize={24}
            />
            <ButtonLink
              children={
                <Feather
                  name="plus-circle"
                  size={30}
                  color={COLORS.orange[900]}
                />
              }
              route="PetRegisterScreen"
              backgroundColor="none"
              borderWidth={-1}
              paddingHorizontal={-1}
              paddingVertical={-1}
            />
          </View>

          <CardHeartbeatPet />
          <CardHeartbeatPet />

          <View
            style={{
              paddingTop: 150,
              paddingBottom: 50,
            }}
          >
            <ContainerAddPet />
          </View>
        </View>
      </LayoutWrapper>
    </>
  );
}