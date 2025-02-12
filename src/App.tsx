import "./App.css";
import Layout from "./components/Layout";
import Quiz from "./pages/Quiz";
import Error from "./components/Error";
import { loader as resultLoader } from "./pages/Result";

import {
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Result from "../src/pages/Result";
import Category from "./pages/Category";

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route
					path="/"
					element={<Layout />}
					errorElement={<Error />}>
					<Route
						index
						element={<Home />}
					/>

					<Route
						path="category"
						element={<Category />}
					/>
					<Route
						path="category/:id"
						element={<Quiz />}
					/>
					<Route
						path="category/:id/result"
						element={<Result />}
						loader={resultLoader}
					/>
				</Route>
				<Route
					path="*"
					element={<Error />}
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
