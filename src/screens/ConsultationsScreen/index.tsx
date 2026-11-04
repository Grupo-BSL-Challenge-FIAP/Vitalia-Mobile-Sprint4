import { Text, View } from "react-native";
import LayoutWrapper from "../../components/LayoutWrapper";
import Header from "../../components/Header";
import ConsultationWithOutAppointment from "../../components/ConsultationWithOutAppointment";
import ConsultationWithAppointment from "../../components/ConsultationWithAppointment";

export default function ConsultationsScreen() {
    return(
        <LayoutWrapper paddingBottom={80} paddingHorizontal={-1}>
            <Header textHeader="Consultas" isBackBottom={false} />
            
            <View
                style={{
                    margin: 20,
                }}
            >
                <ConsultationWithAppointment />
            </View>
        </LayoutWrapper>
    )
}