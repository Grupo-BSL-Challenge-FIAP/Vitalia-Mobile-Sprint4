import { Image, View } from "react-native";
import SubTitleOrange from "../SubTitleOrange";
import { FONTS } from "../../styles/styles";

export default function CardLogo() {
    return(
        <View
            style={{
                alignItems: 'center',
                gap: 10
            }}
        >
            <Image source={require('../../assets/logo_sobre_app.png')} />
            <SubTitleOrange title="Versão 2.0.0" fontFamily={FONTS.inter[500]} fontSize={13}/>
        </View>
    )
}