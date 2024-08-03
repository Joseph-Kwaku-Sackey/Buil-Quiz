import InputLabel from "./InputLabel";
import StatusView from "./StatusView";
import {
	useNextValue,
	useOptionValue,
	useGeneralContext,
	useFetch,
} from "../customHooks/customHooks";
import { useEffect, useState } from "react";

const Content = () => {
	// const { nextValue } = useNextValue();
	const { optionValue } = useOptionValue();
	const { state } = useGeneralContext();
	const [randomValueNumber, setRandomValueNumber] = useState<number>(0);
	const { fetchData,isloading,isError } = useFetch("http://localhost:2024/techData");

	useEffect(() => {
		const randomValue = Math.floor(Math.random() * 85);
		setRandomValueNumber(randomValue)
	}, []);

	

	const questAns = fetchData? fetchData[randomValueNumber]: null

  if(isloading){
    return (
			<div className="loader-container">
				<span className="loader-container__loader"></span>
			</div>
		);
  }
  if(isError){
    return (
			<div className="loader-container">
				<p className="text-red-500 font-bold text-[1.3rem]">Oops Something went wrong!</p>
			</div>
		);
  }

	return (
		<>
			<main>
				<article className="quiz-container">
					{!state.isViewScoreMode && (
						<section className="text-left flex flex-col">
							<h2 className="quiz-container__question">{questAns?.question}</h2>
							{!state.isSelected && (
								<div className="h-[25px]">
									<p className="error-message font-bold">
										Select an option to proceed
									</p>
								</div>
							)}
						</section>
					)}
					<section>
						<form>
							{!state.isViewScoreMode && (
								<>
									{questAns?.options.map((value, i) => {
										return (
											<InputLabel
												key={i}
												option={value}
												name={String(i)}
											/>
										);
									})}
								</>
							)}
							<StatusView questionData={questAns} />
						</form>
					</section>
				</article>
			</main>
		</>
	);
};

export default Content;
