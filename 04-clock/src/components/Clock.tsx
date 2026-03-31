import { useEffect, useState } from "react";

const Clock = () => {
	const [time, setTime] = useState(() => {
		console.log("🔋 Initializing flux capacitor...");
		return new Date().toLocaleTimeString();
	});

	useEffect(() => {
		console.log("🔫 Starting clock...");
		const intervalId = setInterval(() => {
			setTime(new Date().toLocaleTimeString());
			console.log("🕰️ Tick...", new Date().toLocaleTimeString());
		}, 1000);

		return () => {
			// This clean-up function will be executed when
			// the component is about to be unmounted
			console.log("💣💥 Clock is being unmounted 😰 Stopping timer to prevent time paradoxes 😎");
			clearInterval(intervalId);
		}
	}, []);

	return (
		<div className="display-1 font-monospace text-center">
			{time}
		</div>
	)
}

export default Clock;
