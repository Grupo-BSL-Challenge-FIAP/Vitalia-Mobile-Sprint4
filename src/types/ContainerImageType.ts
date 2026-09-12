import { ImageSourcePropType } from "react-native";

export interface ContainerImageType {
    imagePath: ImageSourcePropType;
    alignItems?: "center" | "flex-start" | "flex-end";
    marginBottom?: number; 
    marginTop?: number;
    marginVertical?: number;
}