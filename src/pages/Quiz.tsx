// import { FetchDataType } from "../utilities/DataFetches";
import InputLabel from "../components/InputLabel";
import StatusView from "../components/StatusView";
import { useContextApi, useQueryData } from "../customHooks/customHooks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataType } from "../utilities/DataFetches";

export type LoaderArgsType = { params: { id: string } };

export let fetchDataLenghtVar = 0;
export let fetchDataExpo: DataType[];

const Content = () => {
	const params = useParams();
	const {
		modeTransitionState,
		globalQuizValueStatusState,
		globalQuizValueStatusDispatch,
	} = useContextApi();
	const [randomValue, setRandomValue] = useState<number>(0);
	const { fetchData } = useQueryData(params);
	

	const fetchDataLength = fetchData.length;

	// console.log(fetchData);

	useEffect(() => {
		fetchDataLenghtVar = fetchDataLength;
		fetchDataExpo = fetchData;
		const random = Math.floor(Math.random() * fetchDataLength);
		setRandomValue(
			JSON.parse(sessionStorage.getItem("currentQuestion")!) || random
		);
		globalQuizValueStatusDispatch({
			type: "CATEGORY_TYPE_PARAM",
			payload: params.id!,
		});
	}, []);

	const questionData =
		fetchData[globalQuizValueStatusState.nextQuestion || randomValue];

	return (
		<div className="flex justify-center items-center">
			<article className="quiz-container  mx-4 w-[400px] mb-14">
				{!modeTransitionState.isViewScoreMode && (
					<section className="text-left flex flex-col">
						<h2 className="quiz-container__question ">
							{questionData?.question}
						</h2>
						{!modeTransitionState.isSelected && (
							<div className="h-[25px]">
								<p className="error-message font-bold">
									Select an option to proceed
								</p>
							</div>
						)}
					</section>
				)}
				<section>
					<form>
						{!modeTransitionState.isViewScoreMode && (
							<>
								{questionData?.options.map((value, i) => {
									return (
										<InputLabel
											key={i}
											option={value}
											id={String(i)}
										/>
									);
								})}
							</>
						)}
						<StatusView questionData={questionData} />
					</form>
				</section>
			</article>
		</div>
	);
};
export default Content;
