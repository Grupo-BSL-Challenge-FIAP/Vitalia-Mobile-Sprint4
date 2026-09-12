import { View } from "react-native";
import TitleOrange from "../TitleOrange";
import { COLORS } from "../../styles/styles";
import { DataConfirmationCardType } from "../../types/DataConfirmationCardType";

export default function DataConfirmationCard({ children, title }: DataConfirmationCardType) {
  return (
    <View>
        <TitleOrange title={title} />
        <View
            style={{
                width: "100%",
                backgroundColor: COLORS.orange[100],
                padding: 20,
                borderRadius: 15,
                borderWidth: 2,
                borderBottomWidth: 5,
                borderColor: COLORS.orange[900],
                gap: 20,
            }}
        >
            {children}
        </View>
    </View>
  );
}