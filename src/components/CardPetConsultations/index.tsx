import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS } from "../../styles/styles";
import TitleOrange from "../TitleOrange";
import SubTitleOrange from "../SubTitleOrange";

type AppointmentStatus = "SCHEDULED" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

interface CardPetConsultationsProps {
  petName: string;
  petImage: ImageSourcePropType;
  title: string;
  veterinarianName: string;
  appointmentDate: string;
  status: AppointmentStatus | string;
}
export default function CardPetConsultations({
  petName,
  petImage,
  title,
  veterinarianName,
  appointmentDate,
  status,
}: CardPetConsultationsProps) {

  const getStatusStyle = () => {
    switch (status) {
      case "CONFIRMED":
        return {
          label: "Confirmada",
          backgroundColor: COLORS.green[220],
          color: COLORS.green[200],
        };

      case "SCHEDULED":
        return {
          label: "Pendente",
          backgroundColor: COLORS.yellow[120],
          color: COLORS.yellow[100],
        };

      case "CANCELLED":
        return {
          label: "Cancelada",
          backgroundColor: COLORS.red[300],
          color: COLORS.red[600],
        };

      case "COMPLETED":
        return {
          label: "Concluída",
          backgroundColor: COLORS.green[220],
          color: COLORS.green[200],
        };
    }
  };

  const formatAppointmentDate = (date: string) => {
    const currentDate = new Date(date);

    const months = [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ];

    const hours = String(
      currentDate.getHours(),
    ).padStart(2, "0");

    const minutes = String(
      currentDate.getMinutes(),
    ).padStart(2, "0");

    return `${currentDate.getDate()} de ${months[currentDate.getMonth()]}, ${hours}h${minutes}`;
  };

  const statusStyle = getStatusStyle();

  return(
      <TouchableOpacity
          style={{
              flexDirection: 'row',
              paddingVertical: 15,
              paddingHorizontal: 20,
              backgroundColor: COLORS.orange[910],
              borderRadius: 10,
              borderColor: COLORS.orange[930],
              borderWidth: 1,
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
          }}
      >
          <View>
              <Image 
                  source={petImage} 
                  style={{
                      width: 64,
                      height: 64, 
                      borderWidth: 1,
                      borderColor: COLORS.orange[900],
                      borderRadius: 10,
                      marginTop: 8                      
                  }}
              />
              <Text
                  style={{
                      textAlign: 'center',
                      marginTop: 10,
                      fontSize: 15,
                      color: COLORS.orange[900],
                      fontFamily: FONTS.inter[500]
                  }}
              >
                  {petName}
              </Text>
          </View>

          <View
              style={{
                  borderWidth: 1.1,
                  backgroundColor: COLORS.orange[900],
                  boxShadow: '2px 0px 4px rgba(0, 0, 0, 0.25)',
                  marginLeft: 25,
                  marginRight: 20,
              }}
          >
          </View>
          
          <View
              style={{
                  justifyContent: 'space-between',
                  flex: 1,
              }}
          >
              <View
                  style={{
                      gap: 5
                  }}
              >
                  <TitleOrange 
                      title={title} 
                      fontSize={13}
                      fontFamily={FONTS.inter[700]}
                  />
                  <SubTitleOrange 
                      title={veterinarianName}
                      fontSize={11}
                      fontFamily={FONTS.inter[400]}
                      color={COLORS.orange[900]}
                  />
                  <SubTitleOrange 
                      title={formatAppointmentDate(appointmentDate)}
                      fontSize={11}
                      fontFamily={FONTS.inter[400]}
                      color={COLORS.orange[900]}
                  />
              </View>

              <View
                  style={{
                      backgroundColor: statusStyle.backgroundColor,
                      paddingVertical: 5,
                      paddingHorizontal: 8,
                      borderRadius: 20,
                      width: 90
                  }}
              >
                  <Text
                      style={{
                          color: statusStyle.color,
                          textAlign: 'center',
                          fontSize: 12,
                          fontFamily: FONTS.inter[600]
                      }}
                  >
                      {statusStyle.label}
                  </Text>
              </View>
          </View>
      </TouchableOpacity>
  )
}