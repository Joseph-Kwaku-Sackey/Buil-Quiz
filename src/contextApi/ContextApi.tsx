import { ReactNode, useReducer } from "react";
import { ContextApi } from "./CreateContext";
import {
	globalQuizValueReducer,
	globalQuizValueStatusInitialstate,
	modeTransitionInitialState,
	modeTransitionReducer,
} from "../reducer/reducer";

// option value context provider
type childrenType = {
	children: ReactNode;
};



// global value context holder
export const ContextApiProvider = ({ children }: childrenType) => {
	const [modeTransitionState, modeTransitionDispatch] = useReducer(
		modeTransitionReducer,
		modeTransitionInitialState
	);
	const [globalQuizValueStatusState, globalQuizValueStatusDispatch] =
		useReducer(globalQuizValueReducer, globalQuizValueStatusInitialstate);

	return (
		<ContextApi.Provider
			value={{
				modeTransitionState,
				modeTransitionDispatch,
				globalQuizValueStatusState,
				globalQuizValueStatusDispatch,
			}}>
			{children}
		</ContextApi.Provider>
	);
};
