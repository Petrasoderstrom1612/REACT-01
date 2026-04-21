import useLocalStorage from "../hooks/useLocalStorage";
import { ThemeContext } from "./ThemeContext";

interface ThemeContextProviderProps {
	children: React.ReactNode;
}

const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
	const [isDarkMode, setIsDarkMode] = useLocalStorage("hn_darkmode", true);

	const toggleTheme = () => {
		// set new state
		setIsDarkMode(!isDarkMode);
	}

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
			{/* ALL MY CHILDREN THAT I WILL PROVIDE THEMECONTEXT TO */}
			{children}
		</ThemeContext.Provider>
	)
}

export default ThemeContextProvider;
