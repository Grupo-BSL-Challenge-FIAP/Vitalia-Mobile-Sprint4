import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BACKGROUND } from "../../styles/styles";
import DogPaws from "../DogPaws";
import DogPawBottomTop from "../DogPawBottomTop";
import HeaderDashboardResponsible from "../HeaderDashboardResponsible";
export interface LayoutWrapperProps {
  children: React.ReactNode;
  paddingHorizontal?: number;
  paddingBottom?: number;
  marginTop?: number;
  isHeaderDashboardResponsible?: boolean;
  isDogPaws?: boolean;
  isDogPawBottomTop?: boolean;
  justifyContent?: "center" | "flex-end" | "flex-start";
  alignItems?: "center" | "flex-end" | "flex-start";
}

export default function LayoutWrapper({
  children,
  paddingHorizontal,
  paddingBottom,
  marginTop,
  isHeaderDashboardResponsible = false,
  isDogPaws = false,
  isDogPawBottomTop = false,
  justifyContent,
  alignItems,
}: LayoutWrapperProps) {
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: BACKGROUND.backgroundMain,
          paddingHorizontal: paddingHorizontal || 15,
          paddingBottom: paddingBottom || 0,
        }}
      >
        {isDogPaws && <DogPaws />}
        {isDogPawBottomTop && <DogPawBottomTop />}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: justifyContent,
            alignItems: alignItems,
            marginTop: marginTop,
          }}
          >
          {isHeaderDashboardResponsible && <HeaderDashboardResponsible />}
          {children}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
