import { ContextApi } from "../contextApi/CreateContext";
import { useContext } from "react";

export const useContextApi = () => {
	const contextApiState = useContext(ContextApi);
	const {
		modeTransitionState,
		modeTransitionDispatch,
		globalQuizValueStatusState,
		globalQuizValueStatusDispatch,
	} = contextApiState;

	return {
		modeTransitionState,
		modeTransitionDispatch,
		globalQuizValueStatusState,
		globalQuizValueStatusDispatch,
	};
};
