export interface ButtonFormLinkType {
  onPress?: () => void;
  paddingVertical?: number;
  marginHorizontal?: number;
  marginTop?: number;
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
}