import { ReactNode } from "react";
import { RootStackParamList } from "../navigation/AppNavigator";

export interface ButtonLinkType {
  route?: keyof RootStackParamList;
  paddingVertical?: number;
  paddingHorizontal?: number;
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  borderRadius?: number;
  backgroundColor?: string;
  fontFamily?: string;
  fontSize?: number;
  colorText?: string;
  borderWidth?: number;
  borderColor?: string;
  children: ReactNode;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  gapTextIcon?: number;
  onPress?: () => void;
}