import { SetStateAction, createContext } from "react";
import { actionType, stateType } from "../reducer/reducer";

//contextApi for option value
interface checkedValueInter {
	optionValue: string;
	setOptionValue: React.Dispatch<SetStateAction<string>>;
}

export const OptionValueContext = createContext<checkedValueInter>(
	{} as checkedValueInter
);

// contextApi for nextQuestion
type nextQuestType = {
	nextValue: number;
	setNextValue: React.Dispatch<SetStateAction<number>>;
};

export const NextValueContext = createContext<nextQuestType>(
	{} as nextQuestType
);

//contextApi for general use
type GenVarType = {
	state: stateType;
	dispatch: React.Dispatch<actionType>;
};
export const GenContext = createContext<GenVarType>({}as GenVarType);
