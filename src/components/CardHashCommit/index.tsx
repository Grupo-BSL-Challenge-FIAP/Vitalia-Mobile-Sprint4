import { Text, View } from "react-native";
import { COLORS, FONTS } from "../../styles/styles";
import Feather from "@expo/vector-icons/Feather";

export default function CardHashCommit() {
  const commitHash = "b9c673fdc5c7c1706b5c10a1fa0bfc11d946dcd6";

  return (
    <View
      style={{
        paddingHorizontal: 12,
        paddingTop: 12,
        paddingBottom: 10,
        borderRadius: 10,
        backgroundColor: COLORS.orange[200],
        gap: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Feather name="git-commit" size={22} color="black" />

        <Text
          style={{
            fontFamily: FONTS.inter[600],
            fontSize: 12,
          }}
        >
          Hash do commit
        </Text>
      </View>

      <Text
        style={{
          fontFamily: FONTS.inter[500],
          fontSize: 12,
          color: COLORS.orange[900],
        }}
      >
        <Text
          style={{
            color: COLORS.orange[500],
          }}
        >
          {commitHash.slice(0, 8)}
        </Text>
        {commitHash.slice(8)}
      </Text>
    </View>
  );
}
