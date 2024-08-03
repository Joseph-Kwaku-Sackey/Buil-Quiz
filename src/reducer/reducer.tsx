// Modes and transition
export type ModeTransitionInitialStateType = {
	isSelected: boolean;
	isStatusMode: boolean;
	isViewScoreMode: boolean;
	answerState: string;
};
export const modeTransitionInitialState: ModeTransitionInitialStateType = {
	isSelected: true,
	isStatusMode: false,
	isViewScoreMode: false,
	answerState: "",
};

export type ModeTransitionActionMainType = [
	{
		type:
			| "NOT_SELECTED"
			| "SELECTED"
			| "VIEW_SCORE_MODE_ON"
			| "VIEW_SCORE_MODE_OFF";
	},
	{
		type: "SET_ANSWER_STATE";
		payload: string;
	},
	{
		type: "SWITCH_STATUS_MODE";
		payload: boolean;
	}
];

export const modeTransitionReducer = (
	state: ModeTransitionInitialStateType,
	action: ModeTransitionActionMainType[number]
) => {
	switch (action.type) {
		case "SELECTED":
			return { ...state, isSelected: true };

		case "NOT_SELECTED":
			return { ...state, isSelected: false };

		case "SWITCH_STATUS_MODE":
			return {
				...state,
				isStatusMode: action.payload,
			};

		case "VIEW_SCORE_MODE_ON":
			return { ...state, isViewScoreMode: true };

		case "VIEW_SCORE_MODE_OFF":
			return { ...state, isViewScoreMode: false };

		default:
			return state;
	}
};

// ___________
// global quiz status value storage
type OptionIputRefType = React.MutableRefObject<HTMLInputElement | null> | null;

export interface GlobalQuizValueStatusInitialStateType {
	answerValue: string;
	optionValue: string;
	progressDigitValue: number;
	nextQuestion: number;
	answeredQuestions: number[];
	currentQuestions: number[];
	optionInputRef: OptionIputRefType;
	levelValue: number;
	finalScore: number;
	quizLevel: number;
	incorrectAnswers: number[];
}

export type GlobalQuizValueStatusActionType = [
	{
		type:
			| "SET_PROGRESS_DIGIT_VALUE"
			| "RESET_PROGRESS_DIGIT_VALUE"
			| "SET_NEXT_QUESTION"
			| "RESET_OPTION_VALUE"
			| "SET_LEVEL_VALUE"
			| "RESET_LEVEL_VALUE"
			| "SET_FINAL_SCORE"
			| "RESET_FINAL_SCORE"
			| "SET_QUIZ_LEVEL"
			| "RESET_INCORRECT_ANSWER"
			| "RESET_CURRENT_QUESTIONS";
	},
	{
		type: "SET_OPTION_VALUE" | "SET_ANSWER_STATE";
		payload: string;
	},
	{ type: "SET_OPTION_INPUT_REF"; payload: OptionIputRefType },
	{
		type:
			| "SET_INCORRECT_ANSWER"
			| "SET_CURRENT_QUESTIONS"
			| "SET_ANSWERED_QUESTIONS";
		payload: number;
	}
];

export const globalQuizValueStatusInitialstate: GlobalQuizValueStatusInitialStateType =
	{
		answerValue: "",
		optionValue: "",
		progressDigitValue: JSON.parse(sessionStorage.getItem("progress")!) || 0,
		nextQuestion: 0,
		currentQuestions: [],
		answeredQuestions: [1,2,4],
		optionInputRef: null,
		levelValue: JSON.parse(sessionStorage.getItem("levelState")!) || 0,
		finalScore: JSON.parse(sessionStorage.getItem("finalScore")!) || 0,
		quizLevel: 1,
		incorrectAnswers:
			JSON.parse(sessionStorage.getItem("incorrectAnswer")!) || [],
	};

export const globalQuizValueReducer = (
	state: GlobalQuizValueStatusInitialStateType,
	action: GlobalQuizValueStatusActionType[number]
) => {
	switch (action.type) {
		case "SET_ANSWER_STATE":
			return { ...state, answerValue: action.payload };

		case "SET_OPTION_VALUE":
			return { ...state, optionValue: action.payload };

		case "RESET_OPTION_VALUE":
			return { ...state, optionValue: "" };

		case "SET_PROGRESS_DIGIT_VALUE":
			return { ...state, progressDigitValue: state.progressDigitValue + 1 };

		case "SET_ANSWERED_QUESTIONS":
			return {
				...state,
				answeredQuestions: [...state.answeredQuestions, action.payload],
			};

		case "SET_CURRENT_QUESTIONS":
			return {
				...state,
				currentQuestions: [...state.currentQuestions, action.payload],
			};
		case "RESET_CURRENT_QUESTIONS":
			return {
				...state,
				currentQuestions: [],
			};

		case "RESET_PROGRESS_DIGIT_VALUE":
			return { ...state, progressDigitValue: 0 };

		case "SET_NEXT_QUESTION":
			return { ...state, nextQuestion: Math.floor(Math.random() * 85) };

		case "SET_OPTION_INPUT_REF":
			return { ...state, optionInputRef: action.payload };

		case "SET_LEVEL_VALUE":
			return { ...state, levelValue: state.levelValue + 20 };
		case "RESET_LEVEL_VALUE":
			return { ...state, levelValue: 0 };

		case "SET_FINAL_SCORE":
			return { ...state, finalScore: state.finalScore + 20 };

		case "RESET_FINAL_SCORE":
			return { ...state, finalScore: 0 };

		case "SET_QUIZ_LEVEL":
			return { ...state, quizLevel: (state.quizLevel += 1) };

		case "SET_INCORRECT_ANSWER":
			return {
				...state,
				incorrectAnswers: [...state.incorrectAnswers, action.payload],
			};
		case "RESET_INCORRECT_ANSWER":
			return {
				...state,
				incorrectAnswers: [],
			};

		default:
			return state;
	}
};
