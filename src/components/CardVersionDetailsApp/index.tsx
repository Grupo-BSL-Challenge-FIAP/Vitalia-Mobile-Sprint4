import { View } from "react-native";
import TitleOrange from "../TitleOrange";
import { COLORS } from "../../styles/styles";
import CardHashCommit from "../CardHashCommit";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import TextDetailVersionApp from "../TextDetailVersionApp";
import Feather from '@expo/vector-icons/Feather';

export default function CardVersionDetailsApp() {
    return (
        <View
            style={{
                gap: 4,
            }}
        >
            <TitleOrange title="Detalhes da versão" fontSize={18} />

            <View
                style={{
                    paddingHorizontal: 15,
                    paddingTop: 15,
                    paddingBottom: 20,
                    borderWidth: 1,
                    borderColor: COLORS.orange[900],
                    borderRadius: 10,
                    boxShadow: '0px 4px 7px rgba(0, 0, 0, 0.25)',
                    gap: 15
                }}
            >
                <CardHashCommit />

                <View
                    style={{
                        gap: 15
                    }}
                >
                    <TextDetailVersionApp 
                        icon={<MaterialIcons name="phone-iphone" size={24} color={COLORS.orange[900]} />} 
                        title="Versão" 
                        response="2.0.0" 
                    />
                    <TextDetailVersionApp 
                        icon={<Feather name="git-branch" size={24} color={COLORS.orange[900]} />} 
                        title="Branch" 
                        response="main" 
                    />
                    <TextDetailVersionApp 
                        icon={<MaterialIcons name="calendar-today" size={24} color={COLORS.orange[900]} />} 
                        title="Publicado em" 
                        response="13/09/2026" 
                    />
                </View>
            </View>
        </View>
    )
}