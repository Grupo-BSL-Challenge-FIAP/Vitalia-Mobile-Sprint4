import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS } from "../../styles/styles";
import { useState } from "react";
import SubTitleOrange from "../SubTitleOrange";
import TitleOrange from "../TitleOrange";
import { usePetAppointments } from "../../hooks/usePetAppointments";
import { useMeasurementHistory } from "../../hooks/useMeasurementHistory";

interface ContainerPetHistoryProps {
  petId: number;
}

type HistoryFilter = "Tudo" | "Consultas" | "Saúde";

export default function ContainerPetHistory({ petId}: ContainerPetHistoryProps) {
  const [active, setActive] = useState<HistoryFilter>("Tudo");

  const { data: appointments = [], isLoading: isLoadingAppointments} = usePetAppointments(petId);

  const { data: measurements = [], isLoading: isLoadingMeasurements} = useMeasurementHistory(petId);

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const formatMonthYear = (date: string) => {
    const currentDate = new Date(date);

    return `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  };

  const formatDay = (date: string) => {
    const currentDate = new Date(date);

    return `${currentDate.getDate()} de ${months[currentDate.getMonth()].toLowerCase()}`;
  };

  const formatTime = (date: string) => {
    const currentDate = new Date(date);

    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");

    return `${hours}h${minutes}`;
  };

  const historyItems = [
    ...appointments.map((appointment) => ({
      id: `appointment-${appointment.id}`,
      type: "Consultas" as const,
      date: appointment.appointmentDate,
      title: appointment.notes || "Consulta",
      description: `Consulta • ${formatTime(appointment.appointmentDate)}`,
    })),

    ...measurements.map((measurement) => ({
      id: `measurement-${measurement.id}`,
      type: "Saúde" as const,
      date: measurement.measurementDate,
      title: "Registro de saúde",
      description: `${Math.round(measurement.heartRate)} Bpm • ${measurement.temperature.toFixed(1).replace(".", ",")}°C`,
      sleepHours: measurement.sleepHours,
      respiratoryRate: measurement.respiratoryRate,
      activityLevel: measurement.activityLevel,
      behaviorScore: measurement.behaviorScore,
    })),
  ].sort(
    (a, b) =>
      new Date(b.date).getTime() -
      new Date(a.date).getTime(),
  );

  const filteredHistory = historyItems.filter((item) => {
    if (active === "Tudo") {
      return true;
    }

    return item.type === active;
  });

  const groupedHistory = filteredHistory.reduce<Record<string, typeof filteredHistory>>(
    (groups, item) => {
      const monthYear = formatMonthYear(item.date);

      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }

      groups[monthYear].push(item);

      return groups;
    },
    {},
  );

  const isLoading = isLoadingAppointments || isLoadingMeasurements;

  const renderFilter = (filter: HistoryFilter) => {
    const isActive = active === filter;

    return (
      <TouchableOpacity
        onPress={() => setActive(filter)}
        style={{
          position: "relative",
          backgroundColor: isActive ? COLORS.orange[900] : COLORS.white[100],
          borderWidth: isActive ? 0 : 1,
          borderColor: COLORS.orange[970],
          borderRadius: 100,
        }}
      >
        <Text
          style={{
            color: isActive ? COLORS.white[100] : COLORS.orange[970],
            paddingVertical: 6,
            paddingHorizontal: 20,
            fontFamily: FONTS.inter[700],
          }}
        >
          {filter}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          gap: 15,
        }}
      >
        {renderFilter("Tudo")}
        {renderFilter("Consultas")}
        {renderFilter("Saúde")}
      </View>

      <View
        style={{
          marginTop: 25,
        }}
      >
        {isLoading && (
          <ActivityIndicator
            size="large"
            color={COLORS.orange[900]}
          />
        )}

        {!isLoading && filteredHistory.length === 0 && (
          <Text
            style={{
              color: COLORS.orange[970],
              fontFamily: FONTS.inter[500],
              textAlign: "center",
              marginTop: 30,
            }}
          >
            Nenhum registro encontrado.
          </Text>
        )}

        {!isLoading &&
          Object.entries(groupedHistory).map(([monthYear, items]) => (
            <View
              key={monthYear}
              style={{
                gap: 10,
                marginBottom: 25,
              }}
            >
              <SubTitleOrange
                title={monthYear}
                fontFamily={FONTS.inter[400]}
                color={COLORS.orange[970]}
                fontSize={16}
              />

              {items.map((item) => (
                <View
                  key={item.id}
                  style={{
                    borderBottomRightRadius: 10,
                    borderTopRightRadius: 10,
                    borderWidth: 2,
                    borderLeftWidth: 4,
                    borderColor: COLORS.orange[700],
                    padding: 15,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <TitleOrange
                      title={item.title}
                      fontSize={17}
                    />

                    <SubTitleOrange
                      title={formatDay(item.date)}
                      fontSize={14}
                      color={COLORS.orange[900]}
                      fontFamily={FONTS.inter[400]}
                    />
                  </View>

                  <SubTitleOrange
                    title={item.description}
                    fontSize={17}
                    color={COLORS.orange[900]}
                    fontFamily={FONTS.inter[400]}
                  />

                  {item.type === "Saúde" && (
                    <View
                      style={{
                        marginTop: 8,
                        gap: 4,
                      }}
                    >
                      <SubTitleOrange
                        title={`Sono: ${item.sleepHours}h • Respiração: ${item.respiratoryRate} rpm`}
                        fontSize={14}
                        color={COLORS.orange[900]}
                        fontFamily={FONTS.inter[400]}
                      />

                      <SubTitleOrange
                        title={`Atividade: ${item.activityLevel} • Comportamento: ${item.behaviorScore}/10`}
                        fontSize={14}
                        color={COLORS.orange[900]}
                        fontFamily={FONTS.inter[400]}
                      />
                    </View>
                  )}

                  <View
                    style={{
                      position: "relative",
                      backgroundColor: item.type === "Consultas" ? COLORS.blue[100] : COLORS.orange[100],
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      width: item.type === "Consultas" ? 80 : 70,
                      borderRadius: 100,
                      marginTop: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: item.type === "Consultas" ? COLORS.blue[900] : COLORS.orange[700],
                        fontFamily: FONTS.inter[500],
                        textAlign: 'center',
                      }}
                    >
                      {item.type === "Consultas" ? "Consulta" : "Saúde"}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ))}
      </View>
    </View>
  );
}