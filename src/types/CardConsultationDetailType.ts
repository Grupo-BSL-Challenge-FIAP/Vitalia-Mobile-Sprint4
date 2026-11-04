import { ReactNode } from "react";

export interface CardConsultationDetailType {
  title?: string;  
  flexDirection?: string;  
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  gap?: number;
  alignItems?: string;
  children: ReactNode;
}