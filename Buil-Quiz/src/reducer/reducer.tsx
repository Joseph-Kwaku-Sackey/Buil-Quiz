export type stateType = {
	isSelected: boolean;
};

export type actionType = {
	type: "NOT_SELECTED" | "SELECTED";
};

export const reducer = (state: stateType, action: actionType) => {
	switch (action.type) {
		case "SELECTED":
			return { ...state, isSelected: true };
		case "NOT_SELECTED":
			return { ...state, isSelected: false };
		default:
			return state;
	}
};

export const initialState: stateType = {
	isSelected: true,
};
