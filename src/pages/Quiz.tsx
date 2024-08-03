import { FetchDataType } from "../utilities/DataFetches";
import InputLabel from "../components/InputLabel";
import StatusView from "../components/StatusView";
import { useContextApi } from "../customHooks/customHooks";
import { Suspense, useEffect, useState } from "react";
import {
	LoaderFunctionArgs,
	useLoaderData,
	Await,
	defer,
	useNavigation,
} from "react-router-dom";
import { getQuestion } from "../utilities/DataFetches";
import Loader from "../components/Loader";

export type LoaderArgsType = { params: { id: string } };

export const loader = async ({
	params,
}: LoaderFunctionArgs<LoaderArgsType>) => {
	const questioNPromise = getQuestion(params);
	return defer({ question: questioNPromise });
};

export type DeferType = {
	question: FetchDataType;
};

const Content = () => {
	const loaderData = useLoaderData() as DeferType;
	const { modeTransitionState, globalQuizValueStatusState } = useContextApi();
	const [randomValue, setRandomValue] = useState<number>(0);
	const navigation = useNavigation();

	useEffect(() => {
		console.log(navigation.state);
	}, [navigation.state]);

	return (
		<section className="flex justify-center items-center h-[70vh] ">
			<Suspense fallback={<Loader />}>
				<Await resolve={loaderData.question}>
					{(dataPromise: FetchDataType) => {
						// console.log(globalQuizValueStatusState.answeredQuestions);

						dataPromise.map((value) => {
							globalQuizValueStatusState.answeredQuestions.filter((val) => {
								if (val !== value.id) {
									// console.log(value);
								}
							});
						});

						const [fetchData] = useState(dataPromise);
						useEffect(() => {
							const random = Math.floor(Math.random() * fetchData.length);
							setRandomValue(
								JSON.parse(sessionStorage.getItem("currentQuestion")!) || random
							);
						}, []);

						const questionData =
							fetchData[globalQuizValueStatusState.nextQuestion || randomValue];
						return (
							<>
								<article className="quiz-container  mx-4 w-[400px] mb-14">
									{!modeTransitionState.isViewScoreMode && (
										<section className="text-left flex flex-col">
											<h2 className="quiz-container__question ">
												{questionData?.question}
											</h2>
											{!modeTransitionState.isSelected && (
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
											{!modeTransitionState.isViewScoreMode && (
												<>
													{questionData?.options.map((value, i) => {
														return (
															<InputLabel
																key={i}
																option={value}
																id={String(i)}
															/>
														);
													})}
												</>
											)}
											<StatusView questionData={questionData} />
										</form>
									</section>
								</article>
							</>
						);
					}}
				</Await>
			</Suspense>
		</section>
	);
};

export default Content;
