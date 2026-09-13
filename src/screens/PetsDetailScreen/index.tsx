import { View } from "react-native";
import LayoutWrapper from "../../components/LayoutWrapper";
import Header from "../../components/Header";

export default function PetsDetailScreen() {
    return (
        <LayoutWrapper paddingHorizontal={-1} paddingBottom={80}>
            <Header textHeader="Detalhes do Pet" isBackBottom={true} />
        </LayoutWrapper>
    )
}