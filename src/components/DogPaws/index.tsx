import { Image, View } from "react-native";

export default function DogPaws() {
  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Image
        source={require("../../assets/dogPaws.png")}
        style={{
          width: "100%",
          height: "100%",
          resizeMode: "cover",
          opacity: 0.30,
        }}
      />
    </View>
  );
}