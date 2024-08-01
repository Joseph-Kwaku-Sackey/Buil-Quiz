import {
	OptionValueContext,
	GenContext,
	NextValueContext,
} from "../contextApi/CreateContext";
import { useContext } from "react";

export const useOptionValue = () => {
	const useContextApi = useContext(OptionValueContext);
	const { optionValue, setOptionValue } = useContextApi;
	return { optionValue, setOptionValue };
};

export const useNextValue = () => {
	const nextValueVar = useContext(NextValueContext);
	const { nextValue, setNextValue } = nextValueVar;
	return { nextValue, setNextValue };
};

export const useGeneralState = () => {
	const genState = useContext(GenContext);
	const {state, dispatch} = genState;
return {state, dispatch};
};
