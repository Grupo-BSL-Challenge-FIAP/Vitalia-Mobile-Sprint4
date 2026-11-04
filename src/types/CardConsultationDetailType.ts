import type { ReactNode } from "react";
import type { ViewStyle } from "react-native";

export interface CardConsultationDetailType {
  title?: string;
  flexDirection?: ViewStyle["flexDirection"];
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  gap?: number;
  alignItems?: ViewStyle["alignItems"];
  children: ReactNode;
}