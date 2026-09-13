import { Text, View } from "react-native";

import TitleOrange from "../TitleOrange";
import Button from "../Button";

import { COLORS, FONTS } from "../../styles/styles";

import {
  Foundation,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { PetResponse } from "../../services/petService";

interface CardInformationDetailPetProps {
  pet: PetResponse;
}

export default function CardInformationDetailPet({
  pet,
}: CardInformationDetailPetProps) {
  const formatDate = (date?: string) => {
    if (!date) {
      return "Não informado";
    }

    const [year, month, day] = date.split("-");

    return `${day}/${month}/${year}`;
  };

  const formatSex = (sex?: string) => {
    if (!sex) {
      return "Não informado";
    }

    return (
      sex.charAt(0).toUpperCase() +
      sex.slice(1).toLowerCase()
    );
  };

  return (
    <View>
      <TitleOrange
        title="Informações"
        color={COLORS.orange[900]}
        fontFamily={FONTS.inter[700]}
      />

      <View
        style={{
          marginHorizontal: 20,
          borderColor: COLORS.orange[900],
          borderWidth: 2,
          paddingHorizontal: 10,
          paddingTop: 10,
          paddingBottom: 16,
          borderRadius: 10,
          gap: 11,
        }}
      >
        {/* SEXO */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: COLORS.orange[900],
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              paddingBottom: 5,
              marginLeft: 5,
            }}
          >
            <Foundation
              name="male-symbol"
              size={24}
              color="black"
            />

            <TitleOrange
              title="Sexo"
              fontFamily={FONTS.inter[600]}
              fontSize={18}
            />
          </View>

          <View>
            <Text
              style={{
                fontFamily: FONTS.inter[400],
                color: COLORS.orange[900],
                fontSize: 14,
              }}
            >
              {formatSex(pet.sex)}
            </Text>
          </View>
        </View>

        {/* PESO */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: COLORS.orange[900],
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
              name="weight"
              size={24}
              color="black"
            />

            <TitleOrange
              title="Peso"
              fontFamily={FONTS.inter[600]}
              fontSize={18}
            />
          </View>

          <View>
            <Text
              style={{
                fontFamily: FONTS.inter[400],
                color: COLORS.orange[900],
                fontSize: 14,
              }}
            >
              {`${pet.weightKg} KG`}
            </Text>
          </View>
        </View>

        {/* NASCIMENTO */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: COLORS.orange[900],
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
              color="black"
            />

            <TitleOrange
              title="Nascimento"
              fontFamily={FONTS.inter[600]}
              fontSize={18}
            />
          </View>

          <View>
            <Text
              style={{
                fontFamily: FONTS.inter[400],
                color: COLORS.orange[900],
                fontSize: 14,
              }}
            >
              {formatDate(pet.birthDate)}
            </Text>
          </View>
        </View>

        <View
          style={{
            marginHorizontal: 40,
          }}
        >
          <Button
            onPress={() => {
              console.log(
                "Editar pet:",
                pet.id,
              );
            }}
            paddingVertical={7}
            fontSize={14}
            colorText={COLORS.white[100]}
          >
            <Text>Editar Informações</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}