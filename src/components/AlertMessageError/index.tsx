import { Text, View } from "react-native";
import { AlertMessageErrorType } from "../../types/AlertMessageErrorType";
import { COLORS } from "../../styles/styles";

export default function AlertMessageError({ message }: AlertMessageErrorType) {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: COLORS.red[100],
        padding: 12,
        borderRadius: 10,
        marginTop: 20,
        borderWidth: 1,
        borderColor: COLORS.red[200],
      }}
    >
      <Text>{message}</Text>
    </View>
  );
}
