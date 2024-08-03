import { Params } from "react-router-dom";

export type DataType = {
	id: number;
	question: string;
	options: string[];
	answer: string;
};

export type FetchDataType = [DataType];

export const getQuestion = async (params: Params<string>) => {
	try {
		const responds = await fetch(
			`https://joseph-kwaku-sackey.github.io/buil-quiz_API/${params.id}.json`
		);
		// "http://localhost:204/techData"

		if (responds.ok) {
			const result: FetchDataType = await responds.json();
			return result;
		} else {
			throw {
				message: "Quiz Not Found",
				statusText: responds.statusText,
				status: responds.status,
			};
		}
	} catch (error) {
		throw error;
	}
};
