export interface CardStatusType {
  background?: string;
  width?: number;
  paddingLeft?: number;
  paddingBottom?: number;
  paddingTop?: number;
  paddingRight?: number;
  borderWidth?: number;
  borderColor?: string;
  borderRadius?: number;
  children: React.ReactNode;
  isIconRoute?: boolean;
  onPress?: () => void;
}
