import { Text, TouchableOpacity } from "react-native";
import { COLORS, FONTS } from "../../styles/styles";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ConsultationStackParamList } from "../../navigation/ConsultationStackNavigator";


export default function ButtonScheduledAppointment() {

  const navigation = useNavigation<NativeStackNavigationProp<ConsultationStackParamList>>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ScheduleAppointment')}  
      style={{
        backgroundColor: COLORS.orange[900],
        paddingVertical: 11,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 5,
        gap: 18
      }}
    >
      <MaterialCommunityIcons name="calendar-plus" size={18} color={COLORS.white[300]} />
      <Text
        style={{
          color: COLORS.white[300],
          fontFamily: FONTS.inter[700],
        }}
      >
        Marcar Consulta
      </Text>
    </TouchableOpacity>
  );
}