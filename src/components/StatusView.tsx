import { useContextApi } from "../customHooks/customHooks";
import { useEffect, useRef, useState } from "react";
import GenBtn from "./GenBtn";
import CorrectIcon from "../assets/img/correctBtn.svg";
import WrongIcon from "../assets/img/WrongBtn.svg";
import { useNavigate, useParams } from "react-router-dom";

interface propsInter {
	questionData: {
		id: number;
		question: string;
		options: string[];
		answer: string;
	} | null;
}

type refType = {
	refValue?: React.MutableRefObject<HTMLSpanElement | null>;
	class: string;
};

const StatusView = (props: propsInter) => {
	const {
		modeTransitionState,
		modeTransitionDispatch,
		globalQuizValueStatusState,
		globalQuizValueStatusDispatch,
	} = useContextApi();
	const [questionsCompletedState, setQuestionsCompletedState] = useState<
		number[]
	>(JSON.parse(sessionStorage.getItem("completedQuestions")!) || []);
	const navigate = useNavigate();
	const param = useParams();
	const btnRef = useRef<HTMLButtonElement | null>(null);
	const statusIconRef = useRef<HTMLImageElement | null>(null);
	const spanLoaderRef = useRef<HTMLSpanElement | null>(null);

	useEffect(() => {
		modeTransitionDispatch({
			type: "SWITCH_STATUS_MODE",
			payload: JSON.parse(sessionStorage.getItem("statusMode")!),
		});
	}, []);

	const handleBtnSubmitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (!globalQuizValueStatusState.optionValue) {
			setTimeout(() => {
				btnRef.current!.classList.add("gen-btn-anim");
			}, 0);
			btnRef.current!.classList.remove("gen-btn-anim");
			modeTransitionDispatch({ type: "NOT_SELECTED" });
		} else {
			sessionStorage.setItem("statusMode", JSON.stringify(true));
			modeTransitionDispatch({
				type: "SWITCH_STATUS_MODE",
				payload: JSON.parse(sessionStorage.getItem("statusMode")!),
			});
			globalQuizValueStatusState.levelValue !== 100
				? (globalQuizValueStatusDispatch({
						type: "SET_PROGRESS_DIGIT_VALUE",
				  }),
				  globalQuizValueStatusDispatch({ type: "SET_LEVEL_VALUE" }))
				: null;
			globalQuizValueStatusDispatch({
				type: "SET_ANSWER_STATE",
				payload: props.questionData!.answer,
			});

			setQuestionsCompletedState((prev) => {
				return [...prev, props.questionData!.id];
			});

			if (
				globalQuizValueStatusState.optionValue !== props.questionData?.answer
			) {
				globalQuizValueStatusDispatch({
					type: "SET_INCORRECT_ANSWER",
					payload: props.questionData!.id,
				});
			}
			globalQuizValueStatusDispatch({
				type: "SET_CURRENT_QUESTIONS",
				payload: props.questionData!.id,
			});
			globalQuizValueStatusDispatch({
				type: "SET_ANSWERED_QUESTIONS",
				payload: props.questionData!.id,
			});
		}
	};

	useEffect(() => {
		sessionStorage.setItem(
			"incorrectAnswer",
			JSON.stringify(globalQuizValueStatusState.incorrectAnswers)
		);
	}, [globalQuizValueStatusState.incorrectAnswers]);

	useEffect(() => {
		if (globalQuizValueStatusState.levelValue <= 100) {
			sessionStorage.setItem(
				"progress",
				JSON.stringify(globalQuizValueStatusState.progressDigitValue)
			);
			sessionStorage.setItem(
				"levelState",
				JSON.stringify(globalQuizValueStatusState.levelValue)
			);
			sessionStorage.setItem(
				"completedQuestions",
				JSON.stringify(questionsCompletedState)
			);
			if (
				globalQuizValueStatusState.answerValue &&
				globalQuizValueStatusState.answerValue ===
					globalQuizValueStatusState.optionValue
			) {
				globalQuizValueStatusDispatch({ type: "SET_FINAL_SCORE" });
			}
		}
	}, [
		globalQuizValueStatusState.progressDigitValue,
		globalQuizValueStatusState.levelValue,
	]);

	useEffect(() => {
		sessionStorage.setItem(
			"finalScore",
			JSON.stringify(globalQuizValueStatusState.finalScore)
		);
	}, [globalQuizValueStatusState.finalScore]);

	useEffect(() => {
		const val = globalQuizValueStatusState?.levelValue! / 100;

		spanLoaderRef.current?.animate(
			[
				{
					transform: `scaleX(${val - 20 / 100})`,
				},
				{
					transform: `scaleX(${val})`,
				},
			],
			{
				duration: 1000,
				fill: "forwards",
				easing: "ease-out",
			}
		);
	}, [globalQuizValueStatusState.levelValue]);

	useEffect(() => {
		sessionStorage.setItem(
			"currentQuestion",
			JSON.stringify(
				globalQuizValueStatusState.nextQuestion ||
					JSON.parse(sessionStorage.getItem("currentQuestion")!)
			)
		);
	}, [globalQuizValueStatusState.nextQuestion]);

	const handleBtnNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		sessionStorage.setItem("statusMode", JSON.stringify(false));
		modeTransitionDispatch({
			type: "SWITCH_STATUS_MODE",
			payload: JSON.parse(sessionStorage.getItem("statusMode")!),
		});
		console.log(
			globalQuizValueStatusState.answeredQuestions,
			globalQuizValueStatusState.currentQuestions
		);
		globalQuizValueStatusDispatch({ type: "SET_NEXT_QUESTION" });
		sessionStorage.setItem("isSelected", JSON.stringify(false));
		sessionStorage.removeItem("selectedOption");
		globalQuizValueStatusState.optionInputRef!.current!.checked = false;
		globalQuizValueStatusDispatch({ type: "RESET_OPTION_VALUE" });
		globalQuizValueStatusState.levelValue === 100
			? navigate(`/category/${param.id}/result`)
			: null;
	};

	return (
		<>
			<section className="status-view-container">
				{!modeTransitionState.isViewScoreMode && (
					<div>
						<p className="status-view-container__level-digit">
							{`${globalQuizValueStatusState.progressDigitValue} / 5`}
						</p>
					</div>
				)}
				{modeTransitionState.isStatusMode && (
					<>
						<div>
							<img
								className="status-icon-animate"
								src={
									globalQuizValueStatusState.optionValue ===
									props.questionData?.answer
										? CorrectIcon
										: WrongIcon
								}
								width={45}
								alt={CorrectIcon ? "correct-icon" : "wrong-icon"}
								ref={statusIconRef}
							/>
						</div>

						<GenBtn
							color={"gen-btn-next-type-color"}
							class={
								"py-[.6em] px-[1.5em] absolute top-1/2 -translate-y-1/2 right-[1em]"
							}
							handleBtnClick={handleBtnNextClick}
							ref={btnRef}
							name={"Next"}
						/>
					</>
				)}
				<div>
					{!modeTransitionState.isStatusMode && (
						<GenBtn
							handleBtnClick={handleBtnSubmitClick}
							ref={btnRef}
							name={"Submit"}
							class="py-[.8em] px-[4em]"
						/>
					)}
				</div>
				<SpanLoader
					class="status-view-container__level-loader"
					refValue={spanLoaderRef}
				/>
			</section>
		</>
	);
};

export default StatusView;

export const SpanLoader = (props: refType) => {
	return (
		<span
			className={props.class}
			ref={props.refValue}></span>
	);
};
