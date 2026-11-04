import LayoutWrapper from "../../components/LayoutWrapper";
import Header from "../../components/Header";
import CardLogo from "../../components/CardLogo";
import { View } from "react-native";
import CardVersionDetailsApp from "../../components/CardVersionDetailsApp";

export default function AboutApplicationScreen() {
    return(
        <LayoutWrapper paddingHorizontal={-1} paddingBottom={80}>
            <Header textHeader="Sobre o app"/>

            <View
                style={{
                    marginVertical: 20,
                    marginHorizontal: 15,
                    gap: 30,
                }}
            >
                <CardLogo />

                <CardVersionDetailsApp />
            </View>
        </LayoutWrapper>
    )
}