import { Form, LoaderFunctionArgs, useLoaderData } from "react-router-dom";

import { useState } from "react";

export const loader = ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url).searchParams.get("error");
	return url;
};

const Login = () => {
	const searchParamValue = useLoaderData() as string;
	const [queryParamValue, setQueryParamValue] =
		useState<string>(searchParamValue);

	setTimeout(() => {
		setQueryParamValue("");
	}, 4000);

	const handleInputOnchange = () => {};

	return (
		<>
			<h2 className="absolute top-20 left-[50vw] -translate-x-1/2 text-red-500 font-bold">
				{queryParamValue}
			</h2>
			<Form
				method="get"
				action=""
				className="border flex px-4 py-8 mx-auto flex-col items-center rounded-md border-blue-400 relative top-1/2 translate-y-1/2 w-[300px]">
				<h1 className="text-[1.5rem] font-bold">Login</h1>
				<div className="flex flex-col gap-4 my-8">
					<label htmlFor="username"></label>
					<input
						id="username"
						className="rounded-md px-4 py-1 placeholder:text-[.9rem] placeholder:text-gray-500 outline-none bg-transparent border border-gray-600"
						name="username"
						type="text"
						placeholder="username"
						onChange={handleInputOnchange}
					/>
					<label htmlFor="password"></label>
					<input
						id="password"
						className="rounded-md px-4 py-1 placeholder:text-[.9rem] placeholder:text-gray-500 outline-none bg-transparent border border-gray-600"
						name="password"
						type="password"
						placeholder="password"
						onChange={handleInputOnchange}
					/>
				</div>
				<button
					className="bg-blue-500 rounded-md px-4 py-1.5 mt-10"
					type="submit">
					Submit
				</button>
			</Form>
		</>
	);
};

export default Login;
