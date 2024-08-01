import InputLabel from "./InputLabel";
import StatusView from "./StatusView";
import { techData } from "../data/techData";
import {
	useNextValue,
	useOptionValue,
	useGeneralState,
} from "../customHooks/customHooks";
import { useEffect, useState } from "react";

const Content = () => {
	// const { nextValue } = useNextValue();
	const { optionValue } = useOptionValue();
	const { state } = useGeneralState();
	const [randomValueNumber, setRandomValueNumber] = useState<number>(0);
	const questAns = techData[randomValueNumber];

	useEffect(() => {
		const randomValue = Math.floor(Math.random() * techData.length);
		setRandomValueNumber(randomValue);
	}, []);

	return (
		<>
			<main>
				<article className="quiz-container">
					<section className="text-left flex flex-col">
						<h2 className="quiz-container__question">{questAns.question}</h2>
						{!state.isSelected ? (
							<div className="h-[25px]">
								<p className="error-message font-bold">Select an option to proceed</p>
							</div>
						) : null}
					</section>
					<section>
						<form>
							{questAns.options.map((value, i) => {
								return (
									<InputLabel
										key={i}
										option={value}
										name={String(i)}
									/>
								);
							})}
							<StatusView />
						</form>
					</section>
				</article>
			</main>
		</>
	);
};

export default Content;
