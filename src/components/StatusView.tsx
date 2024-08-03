import { useOptionValue, useGeneralContext } from "../customHooks/customHooks";
import { useRef } from "react";
import GenBtn from "./GenBtn";
import CorrectIcon from "../assets/img/correctBtn.svg";
import WrongIcon from "../assets/img/WrongBtn.svg";

type propsType = {
	questionData: {
		id: number;
		question: string;
		options: string[];
		answer: string;
	} | null;
};

const StatusView = (props: propsType) => {
	const { optionValue } = useOptionValue();
	const { state, dispatch } = useGeneralContext();
	const btnRef = useRef<HTMLButtonElement | null>(null);

	const handleBtnSubmitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch({ type: "ANSWER_STATE", payload: props.questionData!.answer });

		if (!optionValue) {
			btnRef.current!.className = "gen-btn-anim gen-btn";
			setTimeout(() => {
				btnRef.current!.className = " gen-btn";
				btnRef.current!.style.background = "rgb(140, 0, 0)";
			}, 300);
			dispatch({ type: "NOT_SELECTED" });
		} else {
			dispatch({ type: "STATUS_MODE_ON" });
		}
	};
	

	const handleBtnNextClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
		dispatch({ type: "VIEW_SCORE_MODE_ON" });
		dispatch({ type: "STATUS_MODE_OFF" });
	};

	return (
		<>
			<section className="min-h-[75px] flex justify-center items-center bg-black rounded-[5px] relative overflow-clip status-view-container">
				{!state.isViewScoreMode &&
					<div>
						<p className="status-view-container__level-digit">1 / 5</p>
					</div>
				}
				{state.isStatusMode && (
					<div>
						<img
							src={state.answerState === optionValue ? CorrectIcon : WrongIcon}
							width={40}
							alt={CorrectIcon ? "correct-icon" : "wrong-icon"}
						/>
					</div>
				)}
				<div>
					{!state.isStatusMode && (
						<GenBtn
							handleBtnClick={handleBtnSubmitClick}
							ref={btnRef}
							name={"Submit"}
						/>
					)}
					{state.isStatusMode && (
						<GenBtn
							classes={"gen-btn-next"}
							handleBtnClick={handleBtnNextClick}
							ref={btnRef}
							name={"Next"}
						/>
					)}
				</div>
			</section>
		</>
	);
};

export default StatusView;
