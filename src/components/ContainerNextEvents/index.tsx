import { View } from "react-native";
import { COLORS, FONTS } from "../../styles/styles";
import TitleOrange from "../TitleOrange";
import { FontAwesome6 } from "@expo/vector-icons";
import ContainerTitleSubTitle from "../ContainerTitleSubTitle";
import { usePetAppointments } from "../../hooks/usePetAppointments";

interface ContainerNextEventsProps {
  petId: number;
}

export default function ContainerNextEvents({ petId }: ContainerNextEventsProps) {
  const { data: appointments = [], isLoading } = usePetAppointments(petId);

  const nextAppointment = appointments.filter((appointment) => {
    return (
      new Date(appointment.appointmentDate).getTime() > Date.now() &&
      appointment.status === "SCHEDULED"
    );
  }).sort((a, b) =>
      new Date(a.appointmentDate).getTime() -
      new Date(b.appointmentDate).getTime()
  )[0];

  const formatAppointmentDate = (appointmentDate?: string) => {
    if (!appointmentDate) return "Nenhuma consulta";

    const [date] = appointmentDate.split("T");
    const [, month, day] = date.split("-");

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

    return `${Number(day)} de ${months[Number(month) - 1]}`;
  };

  const formatAppointmentTime = (appointmentDate?: string) => {
    if (!appointmentDate) return "--";

    const [, time] = appointmentDate.split("T");
    const [hour, minute] = time.split(":");

    return `${hour}:${minute}`;
  };

  const appointmentTitle = isLoading
    ? "Carregando..."
    : nextAppointment
      ? `Consulta às ${formatAppointmentTime(nextAppointment.appointmentDate)}`
      : "Nenhum evento próximo";

  const appointmentDate = isLoading
    ? "..."
    : formatAppointmentDate(nextAppointment?.appointmentDate);

  return (
    <>
      <TitleOrange
        title="Próximos eventos"
        fontFamily={FONTS.inter[700]}
        fontSize={24}
      />

      <View
        style={{
          borderWidth: 2,
          borderColor: COLORS.orange[900],
          borderRadius: 10,
          paddingVertical: 15,
          paddingHorizontal: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 15,
          }}
        >
          <View
            style={{
              paddingHorizontal: 13,
              paddingVertical: 13,
              backgroundColor: COLORS.orange[700],
              width: 60,
              borderWidth: 2,
              borderColor: COLORS.orange[900],
              borderRadius: 15,
              alignItems: "center"
            }}
          >
            <FontAwesome6 name="calendar-check" size={35} color={COLORS.white[100]} />
          </View>

          <View>
            <ContainerTitleSubTitle
              alignItems="flex-start"
              textTitle={appointmentTitle}
              fontSizeTiTleOrange={20}
              textSubTitle={appointmentDate}
            />
          </View>
        </View>
      </View>
    </>
  );
}