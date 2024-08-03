import "./App.css";
import Layout from "./components/Layout";
import Content from "./components/Content";

import {
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";
import Home from "./pages/Home";

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route element={<Layout />}>
					<Route
						path="/quiz"
						element={<Content />}
					/>
					<Route
						path="/"
						element={<Home />}
					/>
				</Route>
				<Route
					path="*"
					element={<p>Page Not Found | 404</p>}
				/>
			</>
		)
	);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
