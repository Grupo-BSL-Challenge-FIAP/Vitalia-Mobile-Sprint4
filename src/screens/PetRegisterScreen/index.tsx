import LayoutWrapper from "../../components/LayoutWrapper";
import HeaderForm from "../../components/HeaderForm";
import FormPet from "../../components/FormPet";

export default function PetRegisterScreen() {
  return (
    <LayoutWrapper isDogPawBottomTop={true}>
      <HeaderForm initialStep={2} />
      <FormPet />
    </LayoutWrapper>
  );
}