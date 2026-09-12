import { Image, View } from "react-native";
import TitleOrange from "../TitleOrange";
import { FONTS } from "../../styles/styles";
import ButtonLink from "../ButtonLink";

export default function ContainerAddPet() {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
      }}
    >
      <TitleOrange
        title="Quer adicionar mais um pet?"
        fontFamily={FONTS.inter[700]}
        fontSize={24}
        textAlign="center"
      />

      <Image
        source={require("../../assets/rafiki.png")}
        style={{
          width: 275,
          height: 181,
        }}
      />
      <ButtonLink
        children="Clique Aqui!"
        route="PetRegisterScreen"
        paddingVertical={10}
        paddingHorizontal={35}
        fontSize={18}
        fontFamily={FONTS.inter[700]}
      />
    </View>
  );
}