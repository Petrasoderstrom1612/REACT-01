import { useState } from "react"; //functionality in this file, ThemeContext doublechecks you did not forget some type property
import { ThemeContext } from "./ThemeContext";

interface ThemeContextProviderProps {
    children: React.ReactNode; //standart
}

const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({children}) => { //destructured standard
const [isDarkMode, setIsDarkMode] = useState(true); //do not give set to children like credit card

const toggleTheme = () => [
    setIsDarkMode(!isDarkMode)
]
	return (
		<ThemeContext.Provider value={({isDarkMode, toggleTheme})}>
            {children}
        </ThemeContext.Provider>
	)
}

export default ThemeContextProvider;
