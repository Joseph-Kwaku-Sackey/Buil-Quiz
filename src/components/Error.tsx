import { Link, useRouteError } from "react-router-dom";

type ErrorType = {
	status: string;
	message: string;
};

const Error = () => {
	const errorData = useRouteError() as ErrorType;

	return (
		<section>
			<div className="absolute w-full bg-[rgba(0,0,0,0.593)] h-full top-[50dvh] backdrop-blur-[1em] -translate-y-1/2 flex justify-center items-center">
				<div className="relative ">
					<h2 className="text-[1.1rem] bg-[rgba(32,35,39,0.63)] py-4 px-8 rounded-full backdrop-blur-3xl font-bold">
						{errorData.status} - {errorData.message}
					</h2>
					<div className="mt-32">
						<Link
							to={".."}
							className=" text-[.9rem] text-gray-400 underline underline-offset-4">
							Send me back
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Error;
