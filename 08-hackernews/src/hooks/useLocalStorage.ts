//custom hook return value or function so NOT tsx!
import { useState } from "react"; 

//GENERIC
const useLocalStorage = <T>(key: string, defaultValue: T) => {
const [storedValue, setStoredValue] = useState<T>(() => {//T for default value
    const value = localStorage.getItem(key) ?? "true" //default value if no storage yet
    
    return value !== null ? 
    JSON.parse(value) 
    : defaultValue;
}); 

const setValue= (newValue: T) => {
    setStoredValue(newValue)
    //set to local storage
    //"isDarkMode" hasn't changed yet as React batches state updating
    localStorage.setItem(key, JSON.stringify(newValue)) 
}

//this is the same as const [isDarkMode, setIsDarkMode] that is then used in ThemeContextProvider
return [storedValue, setValue] as const //we return a constant array otherwise declare up tuple  [boolean, (newValue: boolean) => void]
}

export default useLocalStorage;