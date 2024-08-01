import { ReactNode, useState, useReducer, Children } from "react";
import { OptionValueContext, NextValueContext, GenContext } from "./CreateContext";
import { reducer, initialState } from "../reducer/reducer";

// option value context provider
type childrenType = {
	children: ReactNode;
};

export const OptionValueContextProvider = ({ children }: childrenType) => {
	const [optionValue, setOptionValue] = useState<string>("");

	return (
		<OptionValueContext.Provider value={{ optionValue, setOptionValue }}>
			{children}
		</OptionValueContext.Provider>
	);
};

// next value context provider
export const NextValueContextProvider = ({ children }: childrenType) => {
	const [nextValue, setNextValue] = useState<number>(0);

	return (
		<NextValueContext.Provider value={{ nextValue, setNextValue }}>
			{children}
		</NextValueContext.Provider>
	);
};

export const NoSelectionProvider = ({ children }: childrenType) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<GenContext.Provider value={{ state, dispatch }}>{children}</GenContext.Provider>
	);
};
