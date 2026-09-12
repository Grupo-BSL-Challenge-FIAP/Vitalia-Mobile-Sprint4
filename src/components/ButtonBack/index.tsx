import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ButtonBackType } from "../../types/ButtonBackType";
import { COLORS, FONTS } from "../../styles/styles";

export default function ButtonBack({sizeIcon = 43, colorIcon = "white", textTrue = false}: ButtonBackType) {

  const navigation = useNavigation();

  return (
    <TouchableOpacity 
        style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 7
        }}
        onPress={() => navigation.goBack()}
    >
      <Feather name="arrow-left-circle" size={sizeIcon} color={colorIcon} />
        {textTrue && (
            <Text
                style={{
                    fontSize: 20,
                    fontFamily: FONTS.poppins[400],
                    color: COLORS.orange[900]
                }}
            >
                Voltar
            </Text>
        )}
    </TouchableOpacity>
  );
}
