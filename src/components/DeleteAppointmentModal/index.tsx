import {
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../styles/styles";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import TitleOrange from "../TitleOrange";
import SubTitleOrange from "../SubTitleOrange";

interface DeleteAppointmentModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  petName: string;
  appointmentTitle: string;
  appointmentDate: string;
  veterinarianName: string;
}

export default function DeleteAppointmentModal({
  visible,
  onClose,
  onConfirm,
  isDeleting,
  petName,
  appointmentTitle,
  appointmentDate,
  veterinarianName,
}: DeleteAppointmentModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => {
        if (!isDeleting) {
          onClose();
        }
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.55)",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 30,
        }}
      >
        <View
          style={{
            width: "100%",
            backgroundColor: COLORS.white[100],
            borderRadius: 12,
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.inter[700],
                fontSize: 23,
                color: COLORS.orange[900],
                textAlign: "center",
              }}
            >
              Cancelar consulta?
            </Text>

            <TouchableOpacity
              onPress={onClose}
              disabled={isDeleting}
              style={{
                position: "absolute",
                right: 0,
              }}
            >
              <AntDesign
                name="close-circle"
                size={30}
                color={COLORS.orange[900]}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginTop: 18,
              marginBottom: 15,
              alignItems: "center",
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.red[810],
                width: 72,
                height: 72,
                borderRadius: 100,
              }}
            >
              <FontAwesome
                name="calendar-times-o"
                size={33}
                color={COLORS.red[800]}
              />
            </View>
          </View>

          <View
            style={{
              marginVertical: 15,
              paddingHorizontal: 14,
              paddingTop: 13,
              paddingBottom: 16,
              backgroundColor: COLORS.orange[920],
              borderRadius: 10,
              gap: 5,
            }}
          >
            <TitleOrange
              title={`${petName} - ${appointmentTitle}`}
              fontFamily={FONTS.inter[600]}
              fontSize={16}
            />

            <SubTitleOrange
              title={appointmentDate}
              fontFamily={FONTS.inter[600]}
              fontSize={14}
              color={COLORS.orange[900]}
            />

            <SubTitleOrange
              title={veterinarianName}
              fontFamily={FONTS.inter[400]}
              fontSize={13}
              color={COLORS.gray[700]}
            />
          </View>

          <Text
            style={{
              textAlign: "center",
              fontFamily: FONTS.inter[400],
              fontSize: 14,
              color: COLORS.gray[700],
            }}
          >
            Deseja mesmo cancelar? A consulta será removida permanentemente.
          </Text>

          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              gap: 20,
            }}
          >
            <TouchableOpacity
              onPress={onClose}
              disabled={isDeleting}
              style={{
                flex: 1,
                borderWidth: 2,
                borderColor: COLORS.orange[900],
                paddingVertical: 10,
                borderRadius: 6,
                alignItems: "center",
                opacity: isDeleting ? 0.5 : 1,
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.inter[700],
                  color: COLORS.orange[900],
                  fontSize: 14,
                }}
              >
                Manter consulta
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onConfirm}
              disabled={isDeleting}
              style={{
                flex: 1,
                backgroundColor: COLORS.red[700],
                paddingVertical: 10,
                borderRadius: 6,
                alignItems: "center",
                justifyContent: "center",
                opacity: isDeleting ? 0.7 : 1,
              }}
            >
              {isDeleting ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <ActivityIndicator
                    size="small"
                    color={COLORS.white[100]}
                  />

                  <Text
                    style={{
                      fontFamily: FONTS.inter[700],
                      color: COLORS.white[100],
                      fontSize: 13,
                    }}
                  >
                    Cancelando...
                  </Text>
                </View>
              ) : (
                <Text
                  style={{
                    fontFamily: FONTS.inter[700],
                    color: COLORS.white[100],
                    fontSize: 13,
                  }}
                >
                  Cancelar consulta
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}