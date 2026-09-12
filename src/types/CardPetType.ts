export interface CardPetType {
  backgroundColor?: string;
  paddingVertical?: number;
  paddingHorizontal?: number;
  borderTopWidth?: number;
  borderBottomWidth?: number;
  borderColor?: string;
  borderRadius?: number;
  marginTop?: number;
  marginBottom?: number;
  flexDirection?: "row" | "column";
  gap?: number;
  children: React.ReactNode;
}
