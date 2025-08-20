import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import React, { useEffect, useState } from "react";

const lightTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    background: "#F6F6F6",
    card: "#fff",
    text: "rgba(0,0,0,.6)",
    border: "rgba(0,0,0,.1)",
  },
};

const darkTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    background: "#000303",
    card: "rgba(255,255,255,.05)",
    text: "rgba(255,255,255,.6)",
    border: "rgba(255,255,255,.2)",
  },
};

export interface ThemeContextValue {
  setDarkTheme: () => void;
  setLightTheme: () => void;
  toggleTheme: () => void;
  isDarkTheme: boolean;
}

export const ThemeContext = React.createContext<ThemeContextValue>({
  setDarkTheme: () => {},
  setLightTheme: () => {},
  toggleTheme: () => {},
  isDarkTheme: false,
});

export interface ThemeContextProviderProps {
  children: React.ReactNode;
}

export const ThemeContextProvider = ({
  children,
}: ThemeContextProviderProps) => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [isDarkTheme, setIsDarkTheme] = useState(colorScheme === "dark");

  useEffect(() => {
    setIsDarkTheme(colorScheme === "dark");
  }, [colorScheme]);

  const themeContext = React.useMemo(
    () => ({
      setDarkTheme: () => {
        setColorScheme("dark");
        setIsDarkTheme(true);
      },
      setLightTheme: () => {
        setColorScheme("light");
        setIsDarkTheme(false);
      },
      toggleTheme: () => {
        const newTheme = colorScheme === "dark" ? "light" : "dark";
        setColorScheme(newTheme);
        setIsDarkTheme(newTheme === "dark");
      },
      isDarkTheme,
    }),
    [colorScheme, isDarkTheme, setColorScheme]
  );

  const theme = isDarkTheme ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={themeContext}>
      <NavigationContainer theme={theme}>{children}</NavigationContainer>
    </ThemeContext.Provider>
  );
};
