//functionality in this file, ThemeContext doublechecks you did not forget some type property
import { ThemeContext } from "./ThemeContext";
import useLocalStorage from "../hooks/useLocalStorage"

interface ThemeContextProviderProps {
    children: React.ReactNode; //standart
}

const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({children}) => { //destructured standard
// const [isDarkMode, setIsDarkMode] = useState(() => {//do not give set to children like credit card
//     const localStorage_hn_darkmode = localStorage.getItem("hn_darkmode") ?? "true" //default value if no storage yet
//     return localStorage_hn_darkmode === "true" //only for initial value
// }); //MOVED TO OWN HOOK

const [isDarkMode, setIsDarkMode] = useLocalStorage("hn_darkmode", true)

const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    //set to local storage
    //"isDarkMode" hasn't changed yet as React batches state updating
    //localStorage.setItem("hn_darkmode", String(!isDarkMode)) //use String for a simple type as boolean
}

// useEffect(() => { badd solution
//     const localStorage_hn_darkmode = localStorage.getItem("hn_darkmode")
//     if (localStorage_hn_darkmode === "false"){
//         setIsDarkMode(false);
//     }
//},[])
	return (
		<ThemeContext.Provider value={({isDarkMode, toggleTheme})}>
            {children}
        </ThemeContext.Provider>
	)
}

export default ThemeContextProvider;
