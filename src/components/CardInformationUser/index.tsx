import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import TitleOrange from "../TitleOrange";
import { COLORS, FONTS } from "../../styles/styles";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useCurrentUser } from "../../hooks/useCurrentUser";

export default function CardInformationUser() {
  const { data: user, isLoading, isError } = useCurrentUser();

  const formatDate = (date?: string | null) => {
    if (!date) {
      return "Não informado";
    }

    const [year, month, day] = date.split("-");

    return `${day}/${month}/${year}`;
  };

  const formatPhone = (phone?: string | null) => {
    if (!phone) {
      return "Não informado";
    }

    const numbers = phone.replace(/\D/g, "");

    if (numbers.length === 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }

    if (numbers.length === 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }

    return phone;
  };

  if (isLoading) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 30,
        }}
      >
        <ActivityIndicator size="small" color={COLORS.orange[900]} />
      </View>
    );
  }

  if (isError || !user) {
    return (
      <View>
        <TitleOrange
          title="Suas informações"
          color={COLORS.orange[900]}
          fontFamily={FONTS.inter[700]}
          fontSize={20}
        />

        <Text
          style={{
            fontFamily: FONTS.inter[500],
            color: COLORS.orange[900],
            marginTop: 10,
          }}
        >
          Não foi possível carregar suas informações.
        </Text>
      </View>
    );
  }

  return (
    <View>
      <TitleOrange
        title="Suas informações"
        color={COLORS.orange[900]}
        fontFamily={FONTS.inter[700]}
        fontSize={20}
      />

      <View
        style={{
          marginTop: 10,
          marginHorizontal: 10,
          borderColor: COLORS.orange[800],
          borderWidth: 2,
          paddingHorizontal: 10,
          paddingTop: 10,
          paddingBottom: 16,
          borderRadius: 10,
          gap: 11,
        }}
      >
        {/* NASCIMENTO */}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: COLORS.orange[800],
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              paddingBottom: 5,
            }}
          >
            <MaterialCommunityIcons
              name="cake-variant-outline"
              size={24}
              color={COLORS.orange[900]}
            />

            <TitleOrange
              title="Nascimento"
              fontFamily={FONTS.inter[600]}
              fontSize={18}
              color={COLORS.orange[875]}
            />
          </View>

          <Text
            style={{
              fontFamily: FONTS.inter[400],
              color: COLORS.orange[900],
              fontSize: 14,
            }}
          >
            {formatDate(user.dateOfBirth)}
          </Text>
        </View>

        {/* TELEFONE */}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: COLORS.orange[800],
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              paddingBottom: 5,
            }}
          >
            <FontAwesome name="phone" size={24} color={COLORS.orange[900]} />

            <TitleOrange
              title="Telefone"
              fontFamily={FONTS.inter[600]}
              fontSize={18}
              color={COLORS.orange[875]}
            />
          </View>

          <Text
            style={{
              fontFamily: FONTS.inter[400],
              color: COLORS.orange[900],
              fontSize: 14,
            }}
          >
            {formatPhone(user.phoneNumber)}
          </Text>
        </View>

        {/* ENDEREÇO */}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: COLORS.orange[800],
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              paddingBottom: 5,
            }}
          >
            <MaterialCommunityIcons
              name="map-marker-outline"
              size={24}
              color={COLORS.orange[900]}
            />

            <TitleOrange
              title="Endereço"
              fontFamily={FONTS.inter[600]}
              fontSize={18}
              color={COLORS.orange[875]}
            />
          </View>

          <Text
            style={{
              fontFamily: FONTS.inter[400],
              color: COLORS.orange[900],
              fontSize: 14,
              maxWidth: "55%",
              textAlign: "right",
            }}
          >
            {user.address || "Não informado"}
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: 30,
          marginHorizontal: 10,
          gap: 12,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.inter[700],
            fontSize: 16,
            color: COLORS.orange[900],
            marginBottom: 2,
          }}
        >
          Conta
        </Text>

        <TouchableOpacity
          onPress={() => {
            console.log("Sair da conta");
          }}
          activeOpacity={0.8}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            paddingVertical: 12,
            borderWidth: 2,
            borderColor: COLORS.orange[900],
            borderRadius: 10,
            backgroundColor: COLORS.white[100],
          }}
        >
          <MaterialCommunityIcons
            name="logout"
            size={22}
            color={COLORS.orange[900]}
          />

          <Text
            style={{
              fontFamily: FONTS.inter[700],
              fontSize: 15,
              color: COLORS.orange[900],
            }}
          >
            Sair da conta
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            console.log("Excluir conta");
          }}
          activeOpacity={0.8}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            paddingVertical: 12,
            borderWidth: 2,
            borderColor: COLORS.red[600],
            borderRadius: 10,
            backgroundColor: COLORS.red[300],
          }}
        >
          <MaterialCommunityIcons
            name="delete-outline"
            size={23}
            color={COLORS.red[600]}
          />

          <Text
            style={{
              fontFamily: FONTS.inter[700],
              fontSize: 15,
              color: COLORS.red[600],
            }}
          >
            Excluir conta
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
