import { Text, View } from "react-native";
import LayoutWrapper from "../../components/LayoutWrapper";

export default function PageUnderDevelopmentScreen() {
    return (
        <LayoutWrapper>
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>
                    Página em desenvolvimento
                </Text>
            </View>
        </LayoutWrapper>
    )
}