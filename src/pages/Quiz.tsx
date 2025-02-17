// import { FetchDataType } from "../utilities/DataFetches";
import InputLabel from "../components/InputLabel";
import StatusView from "../components/StatusView";
import { useContextApi, useQueryData } from "../customHooks/customHooks";
import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataType } from "../utilities/DataFetches";
import { nanoid } from "nanoid";
import Error from "../components/Error";
import Result from "./Result";

export type LoaderArgsType = { params: { id: string } };

export let fetchDataLenghtVar = 0;
export let fetchDataExpo: DataType[];

const Content = () => {
	const params = useParams();
	const {
		modeTransitionState,
		globalQuizValueStatusState,
		globalQuizValueStatusDispatch,
	} = useContextApi();
	const [randomValue, setRandomValue] = useState<number>(0);
	const { fetchData } = useQueryData(params);

	const fetchDataLength = fetchData.length;

	const val = (): number => {
		if (globalQuizValueStatusState.nextQuestion === 0) {
			return randomValue;
		} else {
			return globalQuizValueStatusState.nextQuestion;
		}
	};

	useLayoutEffect(() => {
		fetchDataLenghtVar = fetchDataLength;
		fetchDataExpo = fetchData;
		const random = Math.floor(Math.random() * fetchDataLength);
		const compareWithCurrentQuestion =
			globalQuizValueStatusState.answeredQuestions.includes(
				globalQuizValueStatusState.currentQuestion
			);
		const compareWithRandom =
			globalQuizValueStatusState.answeredQuestions.includes(randomValue);
		if (!compareWithCurrentQuestion || !compareWithRandom) {
			setRandomValue(
				JSON.parse(sessionStorage.getItem("currentQuestion")!) || random
			);
		}

		globalQuizValueStatusDispatch({
			type: "CATEGORY_TYPE_PARAM",
			payload: params.id!,
		});
	}, [globalQuizValueStatusState.currentQuestion]);

	const questionData = fetchData[val()];

	return (
		<>
			<div className="flex justify-center h-full items-center">
				{!modeTransitionState.isCompleted ? (
					<article className="quiz-container mb-20 w-[400px]">
						{!modeTransitionState.isViewScoreMode && (
							<>
								<section className="text-left flex flex-col">
									<h2 className="quiz-container__question ">
										{questionData?.question}
									</h2>
									{modeTransitionState.isSelectionError && (
										<div className="h-[25px]">
											<p className="error-message font-bold">
												Select an option to proceed
											</p>
										</div>
									)}
								</section>
								<section>
									<form>
										<div>
											{questionData.options ? (
												questionData.options.map((value, i) => {
													return (
														<InputLabel
															key={nanoid()}
															option={value}
															id={i}
														/>
													);
												})
											) : (
												<Error />
											)}
										</div>
										<StatusView questionData={questionData} />
									</form>
								</section>
							</>
						)}
					</article>
				) : (
					<Result />
				)}
			</div>
		</>
	);
};
export default Content;
