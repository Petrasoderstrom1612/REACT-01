import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import ThemeContextProvider from "./contexts/ThemeContextProvider.tsx";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider} from "@tanstack/react-query"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: 1000 * 60 * 60, //garbaige time 1h
			refetchOnWindowFocus: false,
			staleTime: 1000 * 60 * 15 // 15 minutes this is important so data does not dissappear
		}
	}
})

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<ThemeContextProvider>
					<App />
				</ThemeContextProvider>
			</BrowserRouter>
		</QueryClientProvider>
	</StrictMode>,
);
