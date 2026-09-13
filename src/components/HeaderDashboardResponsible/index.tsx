import { Image, Text, View } from "react-native";

import { COLORS, FONTS } from "../../styles/styles";
import { useCurrentUser } from "../../hooks/useCurrentUser";

export default function HeaderDashboardResponsible() {
  const {
    data: user,
    isLoading,
    isError,
  } = useCurrentUser();

  const userName = isLoading
    ? "..."
    : user?.fullName ?? "";

  const userEmail = isLoading
    ? ""
    : user?.email ?? "";

  return (
    <View
      style={{
        justifyContent: "center",
        width: "100%",
        backgroundColor: COLORS.orange[900],
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 15,
        }}
      >
        <Image
          source={require("../../assets/dogPaws.png")}
          style={{
            width: 50,
            height: 50,
            borderRadius: 100,
          }}
        />

        <View>
          <Text
            style={{
              fontFamily: FONTS.inter[700],
              color: COLORS.white[100],
              fontSize: 20,
            }}
          >
            {isError
              ? "Olá!"
              : `Olá, ${userName}!`}
          </Text>

          {!isError && (
            <Text
              style={{
                fontFamily: FONTS.inter[500],
                color: COLORS.white[100],
                fontSize: 15,
              }}
            >
              {userEmail}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}
