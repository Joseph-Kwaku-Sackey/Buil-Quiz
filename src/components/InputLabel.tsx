import { useEffect, useRef } from "react";
import { useContextApi } from "../customHooks/customHooks";

type inputType = {
	id: number;
	option: string;
};

const InputLabel = (props: inputType) => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const labelRef = useRef<HTMLLabelElement | null>(null);
	const {
		globalQuizValueStatusDispatch,
		modeTransitionState,
		modeTransitionDispatch,
	} = useContextApi();

	useEffect(() => {
		if (
			JSON.parse(sessionStorage.getItem("selectedOption")!) ===
			inputRef.current?.value
		) {
			inputRef.current!.checked = true;
		} else if (modeTransitionState.isStatusMode) {
			inputRef.current!.disabled = true;
		}
	}, []);

	const handleInputOnchage = () => {
		if (props.option === inputRef.current?.value) {
			sessionStorage.setItem("selectedOption", JSON.stringify(props.option));
			sessionStorage.setItem("isSelected", JSON.stringify(true));
			modeTransitionDispatch({ type: "SELECTED", payload: true });
			modeTransitionDispatch({ type: "SELECTION_ERROR", payload: false });
			globalQuizValueStatusDispatch({
				type: "SET_OPTION_VALUE",
				payload: inputRef.current?.value!,
			});
		}
	};

	return (
		<>
			<section className="input-label-container">
				<div className="flex justify-center items-center">
					<input
						className="input-label-container__input-option"
						id={String(props.id)}
						type="radio"
						value={props.option}
						name="options"
						ref={inputRef}
						onChange={handleInputOnchage}
					/>
					<span className="w-[25px] h-[25px] border-white border-solid border-[1px] relative cursor-pointer scale-[.78] rounded-[20px] input-custom"></span>
				</div>
				<div className="text-left">
					<label
						className="cursor-pointer font-[500]"
						htmlFor={String(props.id)}
						ref={labelRef}>
						{props.option}
					</label>
				</div>
			</section>
		</>
	);
};

export default InputLabel;
