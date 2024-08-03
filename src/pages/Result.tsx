// import GenBtn from "../components/GenBtn";
import { useContextApi } from "../customHooks/customHooks";
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import resultStatusTryBtn from "../assets/img/refresh.svg";
import resultStatusProeedBtn from "../assets/img/next-arrow.svg";
import {
	Await,
	Link,
	LoaderFunctionArgs,
	defer,
	useLoaderData,
} from "react-router-dom";
import { DataType, FetchDataType, getQuestion } from "../utilities/DataFetches";
import { LoaderSub } from "../components/Loader";
import { DeferType, LoaderArgsType } from "./Quiz";

type resultStateType = {
	averageScore: number;
	viewSolution: boolean;
};

export const loader = async ({
	params,
}: LoaderFunctionArgs<LoaderArgsType>) => {
	const questionPromise = getQuestion(params);
	return defer({ question: questionPromise });
};

const Result = () => {
	const loaderData = useLoaderData() as DeferType;
	const [resultState, setResultState] = useState<resultStateType>({
		averageScore: 70,
		viewSolution: false,
	});
	const [resultValueState, setResultValueState] = useState<number>(0);
	const [incorrectValue, setIncorrectValue] = useState<DataType[] | []>([]);
	const { globalQuizValueStatusState, globalQuizValueStatusDispatch } =
		useContextApi();
	const resultValueRef = useRef<HTMLParagraphElement | null>(null);
	const resultProceedBtnRef = useRef<HTMLButtonElement | null>(null);
	const solutionBtnContainerRef = useRef<HTMLDivElement | null>(null);
	const resultStatusTextRef = useRef<HTMLParagraphElement | null>(null);
	const solutionDisplayRef = useRef<HTMLDivElement | null>(null);
	const motivateTextRef = useRef<HTMLParagraphElement | null>(null);

	useLayoutEffect(() => {
		let innitialCountState = 0;
		const intervalId = setInterval(() => {
			if (globalQuizValueStatusState.finalScore !== 0) {
				innitialCountState += 1;
				setResultValueState((prev) => (prev += 1));
				if (innitialCountState === globalQuizValueStatusState.finalScore) {
					clearInterval(intervalId);
				}
			}
		}, 0);
	}, []);

	const resultCompare = () => {
		return globalQuizValueStatusState.finalScore >= resultState.averageScore;
	};

	const handleResultProceedClick = () => {
		sessionStorage.removeItem("levelState");
		globalQuizValueStatusDispatch({ type: "RESET_LEVEL_VALUE" });
		sessionStorage.removeItem("incorrectAnswer");
		globalQuizValueStatusDispatch({ type: "RESET_INCORRECT_ANSWER" });
		sessionStorage.removeItem("progress");
		globalQuizValueStatusDispatch({ type: "RESET_PROGRESS_DIGIT_VALUE" });
		sessionStorage.removeItem("finalScore");
		globalQuizValueStatusDispatch({ type: "RESET_FINAL_SCORE" });
		globalQuizValueStatusDispatch({ type: "SET_QUIZ_LEVEL" });
	};

	const handleSolutionClick = () => {
		setResultState((prev) => {
			return { ...prev, viewSolution: !prev.viewSolution };
		});
	};

	useLayoutEffect(() => {
		const isResultValueRef = resultValueRef.current;
		const isResultProceedBtnRef = resultProceedBtnRef.current;
		const isSolutionBtnContainerRef = solutionBtnContainerRef.current;
		const isResultStatusTextRef = resultStatusTextRef.current;
		const isMotivateTextRef = motivateTextRef.current;
		isResultValueRef?.animate([{ scale: 0.8 }, { scale: 1.3 }], {
			duration: 700,
			fill: "forwards",
			easing: "ease-out",
		});
		isResultValueRef?.animate([{ scale: 1 }], {
			delay: 700,
			duration: 500,
			fill: "forwards",
			easing: "ease-out",
		});
		isResultStatusTextRef?.animate([{ opacity: 1, top: 0 }], {
			delay: 800,
			duration: 700,
			fill: "forwards",
			easing: "ease-out",
		});
		isResultProceedBtnRef?.animate([{ opacity: 1 }], {
			delay: 1000,
			duration: 500,
			fill: "forwards",
			easing: "ease-out",
		});
		isMotivateTextRef?.animate([{ opacity: 1 }], {
			delay: 1200,
			duration: 600,
			easing: "ease-out",
			fill: "forwards",
		});
		isSolutionBtnContainerRef?.animate([{ marginTop: "2em", opacity: 1 }], {
			delay: 1200,
			duration: 500,
			fill: "forwards",
			easing: "ease-out",
		});
	}, [resultValueRef.current]);

	useEffect(() => {
		const isSolutionDisplayRef = solutionDisplayRef.current;
		if (resultState.viewSolution) {
			isSolutionDisplayRef?.animate([{ maxHeight: "300px", display: "flex" }], {
				duration: 500,
				fill: "forwards",
				easing: "ease-out",
			});
		}
	}, [resultState.viewSolution]);

	return (
		<>
			<main className=" mt-[5em]">
				<Suspense fallback={<LoaderSub />}>
					<Await resolve={loaderData.question}>
						{(loaderPromise: FetchDataType) => {
							useEffect(() => {
								globalQuizValueStatusState.incorrectAnswers.map((val) => {
									loaderPromise.map((value) => {
										if (value.id === val) {
											console.log();

											setIncorrectValue((prev) => {
												return [...prev, value];
											});
										}
									});
								});
							}, []);

							return (
								<section className={` flex justify-center `}>
									<div className=" flex flex-col items-center">
										<div className="flex flex-col items-center relative">
											<p
												className={` relative bottom-5 h-[40px] ${
													globalQuizValueStatusState.finalScore! >=
														resultState.averageScore || resultCompare()
														? "text-green-500"
														: "text-red-500"
												}`}
												style={{
													fontWeight: "bold",
													fontSize: "2.5rem",
													position: "relative",
												}}
												ref={resultValueRef}>
												{`${resultValueState}%`}
											</p>
											<p
												className="relative top-3 mb-2 opacity-0"
												ref={resultStatusTextRef}
												style={{
													color: `${
														resultCompare()
															? "rgb(34 197 94)"
															: "rgb(239 68 68)"
													}`,
												}}>
												{resultCompare() ? "Congratulations!" : "try again!"}
											</p>
											<Link
												to=".."
												onClick={handleResultProceedClick}
												relative="path"
												className="">
												<button
													className="opacity-0 my-2 rounded-full relative w-[90px] h-[45px] grid place-content-center "
													ref={resultProceedBtnRef}
													style={{
														backgroundColor: `${
															resultCompare()
																? " hsla(120,24%,9%,1)"
																: "hsla(0,24%,9%,1)"
														}`,
														border: `solid 1px  ${
															resultCompare()
																? " hsla(120,24%,15%,1)"
																: "hsla(0,24%,15%,1)"
														}`,
													}}>
													<img
														src={
															resultCompare()
																? resultStatusProeedBtn
																: resultStatusTryBtn
														}
														alt="result-status-icon"
														width={resultCompare() ? 23 : 18}
													/>
												</button>
											</Link>
										</div>
										<section className="flex justify-center max-sm:w-[80%]">
											{globalQuizValueStatusState.finalScore !== 100 && (
												<>
													{!resultState.viewSolution && (
														<div
															className="flex justify-center opacity-0"
															ref={solutionBtnContainerRef}>
															<button
																className="bg-[rgba(33,33,33,0.72)] text-nowrap transition-all duration-[.3s] hover:bg-[rgb(33,33,33)] px-[3em] rounded-full py-[1em] text-[rgb(21,152,167)]"
																onClick={handleSolutionClick}>
																View Solution
															</button>
														</div>
													)}
													{resultState.viewSolution && (
														<div
															className="bg-[rgba(106,106,106,0.119)] p-[2em] max-sm:p-[1.3em] w-[400px] rounded-[10px] mt-6 overflow-scroll solution-container flex-col gap-4 max-h-0 "
															ref={solutionDisplayRef}>
															{incorrectValue.map((value, i) => {
																return (
																	<div
																		key={i}
																		className="text-left">
																		<h1>{value.question}</h1>
																		<p className="text-green-400">
																			{value.answer}
																		</p>
																	</div>
																);
															})}
															<em>
																<p className="text-[#636363] text-[.88rem]">
																	Hope you know the answer(s) now. <br /> Keep
																	on going...
																</p>
															</em>
														</div>
													)}
												</>
											)}
											{globalQuizValueStatusState.finalScore === 100 && (
												<p
													className="opacity-0 w-[200px] relative top-4 text-[rgb(100,100,100)] italic text-[.88rem]"
													ref={motivateTextRef}>
													Keep on going...
												</p>
											)}
										</section>
									</div>
								</section>
							);
						}}
					</Await>
				</Suspense>
			</main>
		</>
	);
};

export default Result;
