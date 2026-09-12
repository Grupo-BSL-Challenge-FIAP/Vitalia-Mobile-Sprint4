import { TextInput, View } from "react-native";
import TitleOrange from "../TitleOrange";
import { COLORS, FONTS } from "../../styles/styles";
import { InputFormType } from "../../types/InputFormType";

export default function InputForm({ label, placeholder, icon, marginBottom, error, borderBottomWidth, ...rest }: InputFormType) {
  return (
    <View>
      <TitleOrange title={label} fontSize={20} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={error ? COLORS.red[500] : COLORS.orange[300]}
        {...rest}
        style={{
          borderWidth: 2,
          borderBottomWidth: borderBottomWidth || 2,
          borderColor: error ? COLORS.red[500] : COLORS.orange[900],
          borderRadius: 15,
          padding: 13,
          marginVertical: 10,
          fontFamily: FONTS.poppins[500],
          marginBottom: marginBottom || 30,
        }}
      />
      <View 
        style={{
          position: "absolute",
          right: 11,
          top: 60,
        }}
      >
        {icon}
      </View>
    </View>
  );
}
