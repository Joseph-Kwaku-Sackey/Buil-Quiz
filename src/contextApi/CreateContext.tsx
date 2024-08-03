import { createContext } from "react";
import {
	ModeTransitionInitialStateType,
	ModeTransitionActionMainType,
	GlobalQuizValueStatusInitialStateType,
	GlobalQuizValueStatusActionType,
} from "../reducer/reducer";

//contextApi global
export type ContextApiType = {
	modeTransitionState: ModeTransitionInitialStateType;
	modeTransitionDispatch: React.Dispatch<ModeTransitionActionMainType[number]>;
	globalQuizValueStatusState: GlobalQuizValueStatusInitialStateType;
	globalQuizValueStatusDispatch: React.Dispatch<
		GlobalQuizValueStatusActionType[number]
	>;
};
export const ContextApi = createContext<ContextApiType>({} as ContextApiType);
