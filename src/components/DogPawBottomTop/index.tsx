import { Image, View } from "react-native";

export default function DogPawBottomTop() {
  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
      }}
    >
      <Image
        source={require("../../assets/dogPawTop.png")}
        style={{
          position: "absolute",
          top: 55,
          left: -25,
          width: 125,
          height: 125,
          resizeMode: "contain",
          opacity: 0.75,
        }}
      />

      <Image
        source={require("../../assets/dogPawBottom.png")}
        style={{
          position: "absolute",
          top: 700,
          right: -10,
          resizeMode: "contain",
          opacity: 0.35,
        }}
      />
    </View>
  );
}