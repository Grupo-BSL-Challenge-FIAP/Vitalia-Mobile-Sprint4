import { Text } from "react-native";
import LayoutWrapper from "../../components/LayoutWrapper";
import Header from "../../components/Header";

export default function PetHistoryScreen() {
    return (
        <LayoutWrapper paddingHorizontal={-1} paddingBottom={80}>
            <Header isBackBottom={true} textHeader="Histórico - Bolt" />
        </LayoutWrapper>
    )
}