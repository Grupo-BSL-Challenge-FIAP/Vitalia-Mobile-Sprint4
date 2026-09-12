import { TextInputProps } from "react-native";

export interface InputFormType extends TextInputProps {
    placeholder: string;
    label: string;
    icon?: React.ReactNode;
    marginBottom?: number;
    error?: boolean;
    borderBottomWidth?: number;
}