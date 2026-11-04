import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/Header";
import LayoutWrapper from "../../components/LayoutWrapper";
import SubTitleOrange from "../../components/SubTitleOrange";
import { COLORS, FONTS } from "../../styles/styles";
import TitleOrange from "../../components/TitleOrange";
import { useMyPets } from "../../hooks/useMyPets";
import { useImages } from "../../contexts/ImageContext";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useVeterinarians } from "../../hooks/useVeterinarians";

export default function ScheduleAppointment() {
  const { data: pets = [], isLoading, isError } = useMyPets();
  const { getPetImage } = useImages();
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
  const selectedPet =
    pets.find((pet) => pet.id === selectedPetId) ?? pets[0] ?? null;
  const [consultationType, setConsultationType] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedVeterinarianId, setSelectedVeterinarianId] = useState<
    number | null
  >(null);
  const {
    data: veterinarians = [],
    isLoading: isLoadingVeterinarians,
    isError: isVeterinariansError,
  } = useVeterinarians();

  return (
    <LayoutWrapper paddingHorizontal={-1} paddingBottom={80}>
      <Header textHeader="Marcar consulta" />

      <View style={{ margin: 20 }}>
        <SubTitleOrange
          title="Para quem é a consulta?"
          color={COLORS.orange[710]}
          fontFamily={FONTS.inter[500]}
          fontSize={15}
        />

        <TitleOrange
          title="Selecione o pet"
          color={COLORS.orange[710]}
          fontFamily={FONTS.inter[700]}
          fontSize={15}
        />

        {isLoading && (
          <View style={{ alignItems: "center", marginTop: 30 }}>
            <ActivityIndicator size="large" color={COLORS.orange[710]} />

            <Text
              style={{
                marginTop: 10,
                color: COLORS.gray[400],
                fontFamily: FONTS.inter[500],
              }}
            >
              Carregando pets...
            </Text>
          </View>
        )}

        {isError && (
          <Text
            style={{
              marginTop: 20,
              color: COLORS.gray[400],
              fontFamily: FONTS.inter[500],
            }}
          >
            Não foi possível carregar os pets. Tente novamente.
          </Text>
        )}

        {!isLoading && !isError && pets.length === 0 && (
          <Text
            style={{
              marginTop: 20,
              color: COLORS.gray[400],
              fontFamily: FONTS.inter[500],
            }}
          >
            Nenhum pet cadastrado.
          </Text>
        )}

        {!isLoading && !isError && pets.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginTop: 15,
              gap: 20,
            }}
          >
            {pets.map((pet) => {
              const isSelected = selectedPet?.id === pet.id;

              return (
                <View
                  key={pet.id}
                  style={{
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <Pressable
                    onPress={() => setSelectedPetId(pet.id)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                    style={{
                      padding: 15,
                      backgroundColor: isSelected
                        ? COLORS.orange[960]
                        : COLORS.orange[920],
                      borderWidth: 0.5,
                      borderRadius: 10,
                      borderColor: isSelected
                        ? COLORS.orange[710]
                        : COLORS.orange[930],
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <View
                      style={{
                        borderRadius: 10,
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        style={{
                          width: 69,
                          height: 69,
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: COLORS.orange[930],
                        }}
                        source={getPetImage(
                          pet.speciesId,
                          pet.sex,
                          undefined,
                          pet.id,
                        )}
                      />
                    </View>

                    <TitleOrange
                      title={pet.name}
                      fontSize={15}
                      fontFamily={FONTS.inter[500]}
                      color={
                        isSelected ? COLORS.white[100] : COLORS.orange[900]
                      }
                    />
                  </Pressable>

                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: FONTS.inter[500],
                      color: isSelected ? COLORS.orange[710] : COLORS.gray[400],
                    }}
                  >
                    {isSelected ? "(selecionado)" : "(não selecionado)"}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
        <View
          style={{
            marginTop: 30,
          }}
        >
          <View>
            <TitleOrange
              title="Tipo de consulta"
              fontSize={15}
              fontFamily={FONTS.inter[500]}
              color={COLORS.orange[710]}
            />

            <View
              style={{
                width: 262,
                marginTop: 10,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: COLORS.orange[710],
                overflow: "hidden",
              }}
            >
              <Picker
                selectedValue={consultationType}
                onValueChange={(itemValue) =>
                  setConsultationType(String(itemValue))
                }
                style={{
                  color: COLORS.orange[780],
                  height: 55,
                  fontFamily: FONTS.inter[700],
                }}
              >
                <Picker.Item label="Selecionar" value="" />
                <Picker.Item label="Rotina" value="rotina" />
                <Picker.Item label="Vacina" value="vacina" />
                <Picker.Item label="Retorno" value="retorno" />
              </Picker>
            </View>

            <View
              style={{
                marginTop: 30,
                gap: 10,
              }}
            >
              <TitleOrange
                title="Data desejada (sujeito a disponibilidade)"
                fontSize={15}
                fontFamily={FONTS.inter[500]}
                color={COLORS.orange[710]}
              />

              <TouchableOpacity
                onPress={() => setIsDatePickerVisible(true)}
                style={{
                  width: 150,
                  paddingVertical: 8,
                  paddingHorizontal: 25,
                  backgroundColor: COLORS.orange[900],
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: COLORS.white[100],
                    textAlign: "center",
                    fontSize: 15,
                    fontFamily: FONTS.inter[500],
                  }}
                >
                  {selectedDate
                    ? selectedDate.toLocaleDateString("pt-BR")
                    : "Selecionar"}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginTop: 30,
              }}
            >
              <TitleOrange
                title="Tipo de consulta"
                fontSize={15}
                fontFamily={FONTS.inter[500]}
                color={COLORS.orange[710]}
              />

              {isLoadingVeterinarians && (
                <Text
                  style={{
                    marginTop: 10,
                    color: COLORS.gray[400],
                    fontFamily: FONTS.inter[500],
                  }}
                >
                  Carregando veterinários...
                </Text>
              )}

              {isVeterinariansError && (
                <Text
                  style={{
                    marginTop: 10,
                    color: COLORS.gray[400],
                    fontFamily: FONTS.inter[500],
                  }}
                >
                  Não foi possível carregar os veterinários. Tente novamente.
                </Text>
              )}

              {!isLoadingVeterinarians &&
                !isVeterinariansError &&
                veterinarians.length === 0 && (
                  <Text
                    style={{
                      marginTop: 10,
                      color: COLORS.gray[400],
                      fontFamily: FONTS.inter[500],
                    }}
                  >
                    Nenhum veterinário disponível.
                  </Text>
                )}

              <View
                style={{
                  width: 262,
                  marginTop: 10,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: COLORS.orange[710],
                  overflow: "hidden",
                }}
              >
                <Picker
                  selectedValue={selectedVeterinarianId}
                  onValueChange={(itemValue) =>
                    setSelectedVeterinarianId(itemValue)
                  }
                  enabled={
                    !isLoadingVeterinarians &&
                    !isVeterinariansError &&
                    veterinarians.length > 0
                  }
                  style={{
                    color: COLORS.orange[780],
                    height: 55,
                    fontFamily: FONTS.inter[700],
                  }}
                >
                  <Picker.Item label="Selecionar veterinário" value={null} />

                  {veterinarians.map((veterinarian) => (
                    <Picker.Item
                      key={veterinarian.id}
                      label={veterinarian.fullName}
                      value={veterinarian.id}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <View
              style={{
                marginTop: 30,
                gap: 10,
              }}
            >
              <TitleOrange
                title="Horário disponível"
                fontSize={15}
                fontFamily={FONTS.inter[500]}
                color={COLORS.orange[710]}
              />

              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 15,
                }}
              >
                {["09h00", "10h30", "13h00", "15h30"].map((time) => {
                  const isSelected = selectedTime === time;

                  return (
                    <Pressable
                      key={time}
                      onPress={() => setSelectedTime(time)}
                      accessibilityRole="button"
                      accessibilityState={{ selected: isSelected }}
                      style={{
                        paddingVertical: 8,
                        paddingHorizontal: 15,
                        backgroundColor: isSelected
                          ? COLORS.orange[900]
                          : "transparent",
                        borderWidth: isSelected ? 0 : 1,
                        borderRadius: 10,
                        borderColor: COLORS.orange[900],
                      }}
                    >
                      <Text
                        style={{
                          color: isSelected
                            ? COLORS.white[100]
                            : COLORS.orange[900],
                          fontFamily: FONTS.inter[500],
                          fontSize: 15,
                        }}
                      >
                        {time}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={selectedDate ?? new Date()}
        minimumDate={new Date()}
        confirmTextIOS="Confirmar"
        cancelTextIOS="Cancelar"
        onConfirm={(date) => {
          setSelectedDate(date);
          setIsDatePickerVisible(false);
        }}
        onCancel={() => setIsDatePickerVisible(false)}
      />
    </LayoutWrapper>
  );
}
