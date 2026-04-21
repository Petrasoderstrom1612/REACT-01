import { useState } from "react";

const useLocalStorage = <T>(key: string, defaultValue: T) => {
	const [storedValue, setStoredValue] = useState<T>(() => {
		// Get initial state value from localStorage
		const value = localStorage.getItem(key);

		return value !== null
			? JSON.parse(value)
			: defaultValue;
	});

	const setValue = (newValue: T) => {
		// set new state
		setStoredValue(newValue);

		// save new value to localStorage
		localStorage.setItem(key, JSON.stringify(newValue));
	}

	return [
		storedValue,
		setValue
	] as const;
}

export default useLocalStorage;
