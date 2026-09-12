import { Image, Text, TouchableOpacity, View } from "react-native";
import TitleOrange from "../TitleOrange";
import TextLink from "../TextLink";
import { COLORS, FONTS } from "../../styles/styles";
import Entypo from "@expo/vector-icons/Entypo";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PetType } from "../../types/PetType";
import CardPet from "../CardPet";

export default function YourPets() {
  const [pets, setPets] = useState<PetType[]>([]);
  const [petActive, setPetActive] = useState<number | null>(null);
  const activePet = pets.find((pet) => pet.id === petActive);

  const getPetAgeLabel = (birthDate?: string) => {
    if (!birthDate) return "";

    const [day, month, year] = birthDate.split("/").map(Number);
    const birth = new Date(year, month - 1, day);
    const today = new Date();

    let months =
      (today.getFullYear() - birth.getFullYear()) * 12 +
      (today.getMonth() - birth.getMonth());

    if (today.getDate() < birth.getDate()) {
      months--;
    }

    if (months < 0) return "";

    if (months < 12) {
      return `Filhote • ${months} ${months === 1 ? "mês" : "meses"}`;
    }

    const years = Math.floor(months / 12);

    if (years < 8) {
      return `Adulto • ${years} ${years === 1 ? "ano" : "anos"}`;
    }

    return `Idoso • ${years} anos`;
  };

  useEffect(() => {
    const loadPets = async () => {
      const petsStorage = await AsyncStorage.getItem("@petguardian:petsData");
      const activePetStorage = await AsyncStorage.getItem(
        "@petguardian:activePetId",
      );

      const parsedPets = petsStorage ? JSON.parse(petsStorage) : [];

      setPets(parsedPets);

      if (activePetStorage) {
        setPetActive(Number(activePetStorage));
      } else if (parsedPets.length > 0) {
        setPetActive(parsedPets[0].id);
        await AsyncStorage.setItem(
          "@petguardian:activePetId",
          String(parsedPets[0].id),
        );
      }
    };

    loadPets();
  }, []);

  const handleActivePet = async (id: number) => {
    setPetActive(id);

    await AsyncStorage.setItem("@petguardian:activePetId", String(id));
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TitleOrange
          title="Seus pets"
          fontSize={25}
          fontFamily={FONTS.inter[700]}
        />

        <TextLink
          route="ResponsibleRegisterScreen"
          textLink="Ver todos"
          fontFamily={FONTS.inter[500]}
          iconRight={
            <Entypo
              name="chevron-small-right"
              size={23}
              color={COLORS.orange[900]}
            />
          }
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 25,
          marginTop: 5,
          marginBottom: 15,
        }}
      >
        {pets.map((pet) => (
          <TouchableOpacity
            key={pet.id}
            onPress={() => handleActivePet(pet.id)}
          >
            <Image
              source={require("../../assets/dogPaws.png")}
              style={{
                width: 60,
                height: 60,
                borderRadius: 100,
                borderWidth: petActive === pet.id ? 3 : 0,
                borderColor: COLORS.orange[500],
              }}
            />
          </TouchableOpacity>
        ))}
      </View>

      <CardPet>
          <View>
            <Image
              source={require("../../assets/dogPaws.png")}
              style={{
                width: 84,
                height: 84,
                borderRadius: 10,
                borderColor: COLORS.orange[500],
                borderWidth: 2,
              }}
            />
          </View>
          <View
            style={{
              gap: 10,
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: FONTS.inter[700],
                  fontSize: 20,
                  color: COLORS.orange[100],
                  lineHeight: 20,
                }}
              >
                {activePet?.name}
              </Text>
              <Text
                style={{
                  fontFamily: FONTS.inter[500],
                  fontSize: 13,
                  color: COLORS.orange[100],
                }}
              >
                {getPetAgeLabel(activePet?.birthDate)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 24
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: FONTS.inter[700],
                    fontSize: 14,
                    color: COLORS.orange[100],
                    lineHeight: 15,
                  }}
                >
                  Raça:
                </Text>
                <Text
                  style={{
                    fontFamily: FONTS.inter[500],
                    fontSize: 13,
                    color: COLORS.orange[100],
                  }}
                >
                  {activePet?.breed}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: FONTS.inter[700],
                    fontSize: 14,
                    color: COLORS.orange[100],
                    lineHeight: 15,
                  }}
                >
                  Gênero:
                </Text>
                <Text
                  style={{
                    fontFamily: FONTS.inter[500],
                    fontSize: 13,
                    color: COLORS.orange[100],
                  }}
                >
                  {activePet?.gender}
                </Text>
              </View>
            </View>
          </View>
      </CardPet>
    </View>
  );
}
