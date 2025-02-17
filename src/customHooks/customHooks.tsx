import { useSuspenseQuery } from "@tanstack/react-query";
import { ContextApi } from "../contextApi/CreateContext";
import { useContext } from "react";
import { getQuestion } from "../utilities/DataFetches";
import { Params } from "react-router-dom";


export const useContextApi = () => {
	const {
		modeTransitionState,
		modeTransitionDispatch,
		globalQuizValueStatusState,
		globalQuizValueStatusDispatch,
	} = useContext(ContextApi);

	return {
		modeTransitionState,
		modeTransitionDispatch,
		globalQuizValueStatusState,
		globalQuizValueStatusDispatch,
	};
};

export const useQueryData = (param: Params<string>) => {
	const { data: fetchData } = useSuspenseQuery({
		queryKey: ["quizData"],
		queryFn: () => getQuestion(param),
		
	});

	return { fetchData };
};


