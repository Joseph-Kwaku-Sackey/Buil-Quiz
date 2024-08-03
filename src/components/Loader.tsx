export const InputLabelLoader = (props: {
	style: { backgroundColor: string };
}) => {
	return (
		<div className="flex gap-8 items-center">
			<div
				style={props.style}
				className="bg-gray-400 w-[20px] rounded-full h-[20px]"></div>
			<div
				style={props.style}
				className="bg-gray-400 w-[60%] rounded-full h-[10px]"></div>
		</div>
	);
};

export const LoaderSub = () => {
	return (
		<div className="loader-container">
			<span className="loader-container__loader"></span>;
		</div>
	);
};

const Loader = () => {
	const styles = {
		secondaryColor: { backgroundColor: "rgb(200,200,200)" },
	};

	return (
		<div className="loader-container">
			<div className="loader quiz-container flex flex-col mb-14 mx-4 gap-4 py-6 px-8 w-[400px] rounded-[20px] ">
				<div className="flex flex-col mb-2 gap-2">
					<div
						style={styles.secondaryColor}
						className=" w-full rounded-full h-[10px]"></div>
					<div
						style={styles.secondaryColor}
						className=" w-[80%] rounded-full h-[10px]"></div>
				</div>
				<div className="flex flex-col gap-6">
					<InputLabelLoader style={styles.secondaryColor} />
					<InputLabelLoader style={styles.secondaryColor} />
					<InputLabelLoader style={styles.secondaryColor} />
					<InputLabelLoader style={styles.secondaryColor} />
				</div>
				<div>
					<div className="bg-[rgb(20,20,20)] mt-4 relative flex items-center justify-center h-[80px] rounded-md">
						<div className="w-[160px] h-[43px] bg-[rgb(50,50,50)] rounded-md"></div>
						<div
							style={styles.secondaryColor}
							className="w-[20px] absolute h-[10px] rounded-full top-1 left-3 "></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Loader;
