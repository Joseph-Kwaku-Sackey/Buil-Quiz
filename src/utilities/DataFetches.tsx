import axios from "axios";
import { Params } from "react-router-dom";

export type DataType = {
	id: number;
	question: string;
	options: string[];
	answer: string;
};

// export type FetchDataType = [DataType];

const BASE_URL = "https://joseph-kwaku-sackey.github.io/buil-quiz_API/";
// const BASE_URL_LOCAL = "http://localhost:2026/techData";

export const getQuestion = async (
	param: Params<string>
): Promise<DataType[]> => {
	const res = await axios.get(BASE_URL + param.id + ".json");
	return res.data;
};
