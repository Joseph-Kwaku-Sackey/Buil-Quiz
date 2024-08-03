export type stateType = {
	isSelected: boolean;
	isStatusMode: boolean;
	isViewScoreMode: boolean;
	isResultMode: boolean;
	answerState: string;
};

type actionType1 = {
	type:
		| "NOT_SELECTED"
		| "SELECTED"
		| "STATUS_MODE_ON"
		| "STATUS_MODE_OFF"
		| "VIEW_SCORE_MODE_ON"
		| "VIEW_SCORE_MODE_OFF"
		| "RESULTS_MODE_ON"
		| "RESULTS_MODE_OFF";
};

type actionType2 = {
	type: "ANSWER_STATE";
	payload: string ;
};

export type actionMainType = actionType1 | actionType2;

export const reducer = (state: stateType, action: actionMainType) => {
	switch (action.type) {
		case "SELECTED":
			return { ...state, isSelected: true };

		case "NOT_SELECTED":
			return { ...state, isSelected: false };

		case "STATUS_MODE_ON":
			return { ...state, isStatusMode: true };

		case "STATUS_MODE_OFF":
			return { ...state, isStatusMode: false };

		case "ANSWER_STATE":
			return { ...state, answerState: action.payload };

		case "VIEW_SCORE_MODE_ON":
			return { ...state, isViewScoreMode: true };

		case "VIEW_SCORE_MODE_OFF":
			return { ...state, isViewScoreMode: false };

		case "RESULTS_MODE_ON":
			return { ...state, isResultMode: true };

		case "RESULTS_MODE_OFF":
			return { ...state, isResultMode: false };

		default:
			throw new Error("Missing Type");
	}
};

export const initialState: stateType = {
	isSelected: true,
	isStatusMode: false,
	isViewScoreMode: false,
	isResultMode: false,
	answerState: "",
};
