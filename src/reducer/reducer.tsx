import { fetchDataLenghtVar } from "../pages/Quiz";

// Modes and transition
export type ModeTransitionInitialStateType = {
	isSelected: boolean;
	isSelectionError: boolean;
	isStatusMode: boolean;
	isViewScoreMode: boolean;
	answerState: string;
};
export const modeTransitionInitialState: ModeTransitionInitialStateType = {
	isSelected: JSON.parse(sessionStorage.getItem("isSelected")!) || false,
	isSelectionError: false,
	isStatusMode: JSON.parse(sessionStorage.getItem("statusMode")!) || false,
	isViewScoreMode: false,
	answerState: "",
};

export type ModeTransitionActionMainType = [
	{
		type: "SET_ANSWER_STATE";
		payload: string;
	},
	{
		type:
			| "SWITCH_STATUS_MODE"
			| "SELECTION_ERROR"
			| "SELECTED"
			| "VIEW_SCORE_MODE";
		payload: boolean;
	}
];

export const modeTransitionReducer = (
	state: ModeTransitionInitialStateType,
	action: ModeTransitionActionMainType[number]
) => {
	switch (action.type) {
		case "SELECTED":
			return { ...state, isSelected: action.payload };

		case "SELECTION_ERROR":
			return { ...state, isSelectionError: action.payload };

		case "SWITCH_STATUS_MODE":
			return {
				...state,
				isStatusMode: action.payload,
			};

		case "VIEW_SCORE_MODE":
			return { ...state, isViewScoreMode: action.payload };

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
	currentQuestion: number;
	optionInputRef: OptionIputRefType;
	levelValue: number;
	finalScore: number;
	quizLevel: number;
	incorrectAnswers: number[];
	categoryTypeParam: { id: string };
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
			| "RESET_CURRENT_QUESTION"
			| "RESET_ANSWERED_QUESTIONS"
			| "RESET_SELECTED_OPTION_VALUE";
	},
	{
		type: "SET_OPTION_VALUE" | "SET_ANSWER_STATE" | "CATEGORY_TYPE_PARAM";
		payload: string;
	},
	{ type: "SET_OPTION_INPUT_REF"; payload: OptionIputRefType },
	{
		type:
			| "SET_INCORRECT_ANSWER"
			| "SET_CURRENT_QUESTION"
			| "SET_ANSWERED_QUESTIONS";
		payload: number;
	}
];

export const globalQuizValueStatusInitialstate: GlobalQuizValueStatusInitialStateType =
	{
		answerValue: "",
		optionValue: JSON.parse(sessionStorage.getItem("selectedOption")!) || "",
		progressDigitValue: JSON.parse(sessionStorage.getItem("progress")!) || 0,
		nextQuestion: 0,
		currentQuestion:
			JSON.parse(sessionStorage.getItem("currentQuestion")!) || 0,
		answeredQuestions:
			JSON.parse(sessionStorage.getItem("completedQuestions")!) || [],
		optionInputRef: null,
		levelValue: JSON.parse(sessionStorage.getItem("levelState")!) || 0,
		finalScore: JSON.parse(sessionStorage.getItem("finalScore")!) || 0,
		quizLevel: 1,
		incorrectAnswers:
			JSON.parse(sessionStorage.getItem("incorrectAnswer")!) || [],
		categoryTypeParam: { id: "" },
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

		case "SET_CURRENT_QUESTION":
			return {
				...state,
				currentQuestion: { ...state, currentQuestion: action.payload },
			};
		case "RESET_CURRENT_QUESTION":
			return {
				...state,
				currentQuestions: 0,
			};

		case "RESET_PROGRESS_DIGIT_VALUE":
			return { ...state, progressDigitValue: 0 };

		case "SET_NEXT_QUESTION":
			return {
				...state,
				nextQuestion: Math.floor(Math.random() * fetchDataLenghtVar),
			};

		case "CATEGORY_TYPE_PARAM":
			return { ...state, categoryTypeParam: { id: action.payload } };

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
		case "RESET_ANSWERED_QUESTIONS":
			return {
				...state,
				answeredQuestions: [],
			};
		case "RESET_SELECTED_OPTION_VALUE":
			return {
				...state,
				optionValue: "",
			};
		case "RESET_CURRENT_QUESTION":
			return {
				...state,
				currentQuestion: 0,
			};

		default:
			return state;
	}
};
