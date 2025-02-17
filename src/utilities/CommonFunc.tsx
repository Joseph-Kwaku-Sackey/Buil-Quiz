import {
	GlobalQuizValueStatusActionType,
	ModeTransitionActionMainType,
} from "../reducer/reducer";

export const funcReset = (
	triggerItem: string,
	global: React.Dispatch<GlobalQuizValueStatusActionType[number]>,
	mode?: React.Dispatch<ModeTransitionActionMainType[number]>
) => {
	const commonSetters = () => {
		sessionStorage.removeItem("levelState");
		global({ type: "RESET_LEVEL_VALUE" });
		sessionStorage.setItem("incorrectAnswer", JSON.stringify([]));
		global({ type: "RESET_INCORRECT_ANSWER" });
		sessionStorage.removeItem("progress");
		global({ type: "RESET_PROGRESS_DIGIT_VALUE" });
		sessionStorage.removeItem("finalScore");
		global({ type: "RESET_FINAL_SCORE" });
		global({ type: "SET_QUIZ_LEVEL" });
		global({ type: "RESET_SELECTED_OPTION_VALUE" });
		sessionStorage.removeItem("selectedOption");
		mode!({ type: "SWITCH_STATUS_MODE", payload: false });
		sessionStorage.removeItem("statusMode");
		mode!({ type: "SELECTED", payload: false });
		sessionStorage.removeItem("isSelected");
		mode!({ type: "ISCOMPLETED", payload: false });
		sessionStorage.setItem("isCompleted", JSON.stringify(false));
	};
	const handleResultProceedClick = () => {
		if (triggerItem === "logo") {
			commonSetters();
			global({ type: "RESET_CURRENT_QUESTION" });
			sessionStorage.removeItem("currentQuestion");
			global({ type: "RESET_ANSWERED_QUESTIONS" });
			sessionStorage.removeItem("answeredQuestions");
		}
	};
	commonSetters();
	return handleResultProceedClick();
};
