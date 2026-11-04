import { Image, View } from "react-native";
import SubTitleOrange from "../SubTitleOrange";
import { FONTS } from "../../styles/styles";

interface CardLogoProps {
    version: string;
}

export default function CardLogo({ version }: CardLogoProps) {
    return(
        <View
            style={{
                alignItems: 'center',
                gap: 10
            }}
        >
            <Image source={require('../../assets/logo_sobre_app.png')} />

            <SubTitleOrange
                title={`Versão ${version}`}
                fontFamily={FONTS.inter[500]}
                fontSize={13}
            />
        </View>
    )
}