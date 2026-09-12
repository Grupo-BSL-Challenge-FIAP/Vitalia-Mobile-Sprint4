import { Image, View } from "react-native";
import { ContainerImageType } from "../../types/ContainerImageType";

export default function ContainerImage({imagePath, alignItems, marginBottom, marginTop, marginVertical }: ContainerImageType) {
  return (
    <View
      style={{
        alignItems: alignItems || "center",
        marginBottom: marginBottom || 20,
        marginTop: marginTop || 0,
        marginVertical: marginVertical || 0
      }}
    >
      <Image source={imagePath} />
    </View>
  );
}
