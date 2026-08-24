import { RootStackParamList } from "../navigation/AppNavigator";

export interface ButtonLinkType {
  route: keyof RootStackParamList;
  paddingVertical?: number;
  paddingHorizontal?: number;
  alignItems?: "center" | "flex-start" | "flex-end";
  borderRadius?: number;
  backgroundColor?: string;
  fontFamily?: string;
  fontSize?: number;
  colorText?: string;
  borderColor?: string;
  borderWidth?: number;
  children: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  gapTextIcon?: number;
}