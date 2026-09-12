import { Text, View } from "react-native";
import LayoutWrapper from "../../components/LayoutWrapper";
import ButtonBack from "../../components/ButtonBack";
import { COLORS, FONTS } from "../../styles/styles";
import FormResponsible from "../../components/FormResponsible";
import HeaderForm from "../../components/HeaderForm";

export default function ResponsibleRegisterScreen() {
  return (
    <LayoutWrapper isDogPawBottomTop={true}>
      <HeaderForm initialStep={1} />
      <FormResponsible />
    </LayoutWrapper>
  );
}