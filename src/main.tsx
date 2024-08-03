import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/global.css";
import "./styles/ComponentCSS.css";


import {
	OptionValueContextProvider,
	NextValueContextProvider,
	GeneralProvider,
} from "./contextApi/ContextApi.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<GeneralProvider>
			<NextValueContextProvider>
				<OptionValueContextProvider>
					<App />
				</OptionValueContextProvider>
			</NextValueContextProvider>
		</GeneralProvider>
	</React.StrictMode>
);
