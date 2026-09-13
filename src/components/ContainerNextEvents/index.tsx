import { View } from "react-native";
import { COLORS, FONTS } from "../../styles/styles";
import TitleOrange from "../TitleOrange";
import { FontAwesome6 } from "@expo/vector-icons";
import ContainerTitleSubTitle from "../ContainerTitleSubTitle";

export default function ContainerNextEvents() {
  return (
    <>
      <TitleOrange
        title="Próximos eventos"
        fontFamily={FONTS.inter[700]}
        fontSize={24}
      />

      <View 
        style={{
            borderWidth: 2,
            borderColor: COLORS.orange[900],
            borderRadius: 10,
            paddingVertical: 15,
            paddingHorizontal: 15,
        }}
      >
        <View
            style={{
                flexDirection: "row",
                gap: 15,
            }}
        >
            <View
                style={{
                    paddingHorizontal: 13,
                    paddingVertical: 13,
                    backgroundColor: COLORS.orange[700],
                    width: 60,
                    borderWidth: 2,
                    borderColor: COLORS.orange[900],
                    borderRadius: 15,
                    alignItems: "center"
                }}
            >
                <FontAwesome6 name="calendar-check" size={35} color={COLORS.white[100]} />
            </View>
            <View>
                <ContainerTitleSubTitle 
                    alignItems="flex-start"
                    textTitle="Consulta às 12:00"
                    fontSizeTiTleOrange={20}
                    textSubTitle="13 de maio"
                />
            </View>
        </View>
      </View>
    </>
  );
}