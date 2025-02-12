import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/global.css";
import "./styles/ComponentCSS.css";
import "./styles/animationKeyframes.css";
import { ContextApiProvider } from "./contextApi/ContextApi.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const client = new QueryClient({});

ReactDOM.createRoot(document.getElementById("root")!).render(
	<ContextApiProvider>
		<React.StrictMode>
			<QueryClientProvider client={client}>
				<App />
			</QueryClientProvider>
		</React.StrictMode>
	</ContextApiProvider>
);
