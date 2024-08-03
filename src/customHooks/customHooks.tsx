import {
	OptionValueContext,
	GenContext,
	NextValueContext,
} from "../contextApi/CreateContext";
import { useContext, useEffect, useState } from "react";

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

export const useGeneralContext = () => {
	const genState = useContext(GenContext);
	const { state, dispatch } = genState;
	return { state, dispatch };
};

type fetchDataType = [
	{
		id: number;
		question: string;
		options: string[];
		answer: string;
	}
];
export const useFetch = (url: string) => {
	const [isloading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [fetchData, setFetchData] = useState<fetchDataType | null>(null);
	const toFetchData = async () => {
		try {
			const res = await fetch(url);
			
			if (res.ok) {
				setIsLoading(false)
				const result = await res.json();
				setFetchData(result);
			} else {
				setIsLoading(false)
				setIsError(true)
				throw new Error("Something went wrong.");
				
			}
		} catch (error) {
			throw error;
		}
	};

	useEffect(() => {
		toFetchData();
	}, []);

	return { isloading, setIsLoading, fetchData, setFetchData, isError };
};
