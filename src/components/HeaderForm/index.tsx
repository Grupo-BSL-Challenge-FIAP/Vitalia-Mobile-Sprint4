import { Text, View } from "react-native";
import ButtonBack from "../ButtonBack";
import { COLORS, FONTS } from "../../styles/styles";
import { HeaderFormType } from "../../types/HeaderFormType";

export default function HeaderForm({initialStep, totalSteps = 3}: HeaderFormType) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <ButtonBack sizeIcon={35} colorIcon="black" textTrue={true} />
      <Text
        style={{
          fontSize: 20,
          fontFamily: FONTS.poppins[400],
          color: COLORS.orange[900],
        }}
      >
        Passo {initialStep} de {totalSteps}
      </Text>
    </View>
  );
}
