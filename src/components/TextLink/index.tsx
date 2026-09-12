import { Pressable, Text } from "react-native";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TextLinkType } from "../../types/TextLinkType";
import { COLORS, FONTS } from "../../styles/styles";

export default function TextLink({ route, textLink, colorText, fontFamily, fontSize, iconRight, iconLeft, gap, opacity }: TextLinkType) {
  
 const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable 
        onPress={() => navigation.navigate(route)}
        style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: gap || 0,
        }}
    >
        {iconLeft}
        <Text
            style={{
                color: colorText || COLORS.orange[900],
                fontFamily: fontFamily || FONTS.poppins[500],
                fontSize: fontSize || 14,
                opacity: opacity,
            }}
        >
            {textLink}
        </Text>
        {iconRight}
    </Pressable>
  );
}
