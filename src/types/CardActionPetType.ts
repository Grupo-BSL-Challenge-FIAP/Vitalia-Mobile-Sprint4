import React from "react";

export interface CardActionPetType {
    onPress: () => void;
    text: string;
    icon: React.ReactNode;
    background?: string;
    borderColor?: string; 
    borderWidth?: number;
    colorText?: string;
}