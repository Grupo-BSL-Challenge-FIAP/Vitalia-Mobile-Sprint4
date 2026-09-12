import { View } from "react-native";
import { ContainerButtonType } from "../../types/ContainerButtonType";

export default function ContainerButton({children, marginHorizontal, marginTop, marginBottom, marginVertical, gap}: ContainerButtonType) {
  return (
    <View
      style={{
        marginHorizontal: marginHorizontal || 0,
        marginTop: marginTop || 0,
        marginBottom: marginBottom || 0,
        marginVertical: marginVertical || 0,
        gap: gap || 20,
      }}
    >
        {children}
    </View>
  );
}
