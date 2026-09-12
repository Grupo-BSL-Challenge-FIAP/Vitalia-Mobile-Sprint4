import { View } from "react-native";
import { ContainerFormType } from "../../types/ContainerFormType";

export default function ContainerForm({ children, paddingHorizontal } : ContainerFormType) {
  return (
    <View
      style={{
          paddingHorizontal: paddingHorizontal || 23,
      }}
    >
        {children}
    </View>
  );
}