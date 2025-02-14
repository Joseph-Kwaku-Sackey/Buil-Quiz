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
		sessionStorage.removeItem("incorrectAnswer");
		global({ type: "RESET_INCORRECT_ANSWER" });
		sessionStorage.removeItem("progress");
		global({ type: "RESET_PROGRESS_DIGIT_VALUE" });
		sessionStorage.removeItem("finalScore");
		global({ type: "RESET_FINAL_SCORE" });
		global({ type: "SET_QUIZ_LEVEL" });
	};
	commonSetters();
	const handleResultProceedClick = () => {
		if (triggerItem === "logo") {
			commonSetters();
			global({ type: "RESET_ANSWERED_QUESTIONS" });
			sessionStorage.removeItem("answeredQuestions");
			global({ type: "RESET_SELECTED_OPTION_VALUE" });
			sessionStorage.removeItem("selectedOption");
			global({ type: "RESET_CURRENT_QUESTION" });
			sessionStorage.removeItem("currentQuestion");
			mode!({ type: "SWITCH_STATUS_MODE", payload: false });
			sessionStorage.removeItem("statusMode");
			mode!({ type: "SELECTED", payload: false });
			sessionStorage.removeItem("isSelected");
		} else {
			commonSetters();
		}
	};
	return handleResultProceedClick();
};
