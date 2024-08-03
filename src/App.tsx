import "./App.css";
import Layout from "./components/Layout";
import Quiz from "./pages/Quiz";
import Error from "./components/Error";
import Login, { loader as loginLoader } from "./pages/Login";
import { loader as resultLoader } from "./pages/Result";
import { loader as QuestionLoader } from "./pages/Quiz";

import {
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Result from "../src/pages/Result";
import Category from "./pages/Category";
import Loader from "./components/Loader";

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
						loader={QuestionLoader}
					/>
					<Route
						path="category/:id/result"
						element={<Result />}
						loader={resultLoader}
					/>

					<Route
						path="login"
						element={<Login />}
						loader={loginLoader}
					/>

					<Route
						path="loaderPreview"
						element={<Loader />}
					
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
