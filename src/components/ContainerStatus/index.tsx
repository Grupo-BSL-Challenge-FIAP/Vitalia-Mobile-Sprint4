import { View } from "react-native";
import { ContainerStatusType } from "../../types/ContainerStatusType";

export default function ContainerStatus({ children }: ContainerStatusType) {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 20,
      }}
    >
        {children}
    </View>
  );
}
