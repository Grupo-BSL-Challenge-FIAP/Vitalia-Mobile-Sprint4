import { Image, Text, View } from "react-native";
import { COLORS, FONTS } from "../../styles/styles";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ResponsibleType } from "../../types/ResponsibleType";

export default function HeaderDashboardResponsible() {
  const [responsible, setResponsible] = useState<ResponsibleType>({
    name: "",
    email: "",
    birthDate: "",
    cpf: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const loadedStorage = async () => {
      const responsibleData = await AsyncStorage.getItem(
        "@petguardian:responsibleData",
      );

      if (responsibleData) {
        setResponsible(JSON.parse(responsibleData));
      }
    };
    loadedStorage();
  }, []);

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
            {`Olá, ${responsible.name}!`}
          </Text>
          <Text
            style={{
              fontFamily: FONTS.inter[500],
              color: COLORS.white[100],
              fontSize: 15,
            }}
          >
            {responsible.email}
          </Text>
        </View>
      </View>
    </View>
  );
}
