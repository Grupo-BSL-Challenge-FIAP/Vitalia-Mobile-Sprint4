import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";

interface ThemeContextData {
  isDarkMode: boolean;
  backgroundColor: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextData | undefined>(
  undefined,
);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const backgroundColor = isDarkMode ? "#121212" : "#FFFFFF";

  function toggleTheme() {
    setIsDarkMode((current) => !current);
  }

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        backgroundColor,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme deve ser utilizado dentro de ThemeProvider");
  }

  return context;
}