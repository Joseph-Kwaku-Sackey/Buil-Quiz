import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./global.css";
import "./components/ComponentCSS.css";
import {
	OptionValueContextProvider,
	NextValueContextProvider,
	NoSelectionProvider,
} from "./contextApi/ContextApi.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<NoSelectionProvider>
			<NextValueContextProvider>
				<OptionValueContextProvider>
					<App />
				</OptionValueContextProvider>
			</NextValueContextProvider>
		</NoSelectionProvider>
	</React.StrictMode>
);
