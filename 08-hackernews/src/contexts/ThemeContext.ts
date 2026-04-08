import { createContext } from "react"; //this file is just a contract

interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null); //null ensured so that components that do not belong to context get null so for error handling, to find out if somebody is trying to reach it outside of context