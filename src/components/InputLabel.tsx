import { useEffect, useRef } from "react";
import { useContextApi } from "../customHooks/customHooks";

type inputType = {
	id: string;
	option: string;
};

const InputLabel = (props: inputType) => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const labelRef = useRef<HTMLLabelElement | null>(null);
	const {
		globalQuizValueStatusDispatch,
		globalQuizValueStatusState,
		modeTransitionDispatch,
		modeTransitionState,
	} = useContextApi();

	useEffect(() => {
		if (JSON.parse(sessionStorage.getItem("isSelected")!)) {
			if (
				inputRef.current?.id ===
				JSON.parse(sessionStorage.getItem("selectedOption")!)
			) {
				globalQuizValueStatusDispatch({
					type: "SET_OPTION_INPUT_REF",
					payload: inputRef,
				});
				globalQuizValueStatusDispatch({
					type: "SET_OPTION_VALUE",
					payload: inputRef.current?.value!,
				});
				inputRef.current!.checked = true;
			}
		}
	}, [globalQuizValueStatusState.optionValue]);

	const spanLabelCommonValues = () => {
		sessionStorage.setItem("selectedOption", JSON.stringify(props.id));
		modeTransitionDispatch({ type: "SELECTED" });
		sessionStorage.setItem("isSelected", JSON.stringify(true));
		if (
			inputRef.current?.id ===
			JSON.parse(sessionStorage.getItem("selectedOption")!)
		) {
			globalQuizValueStatusDispatch({
				type: "SET_OPTION_VALUE",
				payload: inputRef.current?.value!,
			});
		}
	};

	const handleSpanClick = () => {
		if (!modeTransitionState.isStatusMode) {
			inputRef.current!.checked = true;
			spanLabelCommonValues();
		}
	};
	const handleLabelClick = () => {
		if (!modeTransitionState.isStatusMode) {
			labelRef.current!.htmlFor = `${props.id}`;
			spanLabelCommonValues();
		} else {
			labelRef.current!.htmlFor = "";
		}
	};

	return (
		<>
			<section className="input-label-container">
				<div className="flex">
					<input
						className="input-label-container__input-option"
						id={props.id}
						type="radio"
						value={props.option}
						name="options"
						ref={inputRef}
					/>
					<span
						className="w-[25px] h-[25px] border-white border-solid border-[1px] relative cursor-pointer scale-[.78] rounded-[20px] input-custom"
						onClick={handleSpanClick}></span>
				</div>
				<div className="text-left">
					<label
						className="cursor-pointer font-[500]"
						onClick={handleLabelClick}
						ref={labelRef}>
						{props.option}
					</label>
				</div>
			</section>
		</>
	);
};

export default InputLabel;
