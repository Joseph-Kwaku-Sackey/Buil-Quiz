import { useRef } from "react";
import { useOptionValue,useGeneralState } from "../customHooks/customHooks";

type inputInt = {
	name: string;
	option: string;
};

const InputLabel = (props: inputInt) => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const { setOptionValue } = useOptionValue();
  const {state,dispatch} = useGeneralState()

	const handleSpanClick = () => {
		inputRef.current!.checked = true;
		setOptionValue(props.option);
    dispatch({type: 'SELECTED'})
	};
	const handleLabelClick = () => {
    setOptionValue(props.option);
    dispatch({type: 'SELECTED'})
    
	};

	return (
		<>
			<section className="input-label-container">
				<div className="flex">
					<input
						className="input-label-container__input-option"
						id={props.name}
						type="radio"
						name="options"
						ref={inputRef}
					/>
					<span
						className="w-[20px] h-[20px] border-white border-solid border-[1px] relative cursor-pointer scale-[.78] rounded-[10px] input-custom"
						onClick={handleSpanClick}></span>
				</div>
				<div>
					<label
						className="cursor-pointer"
						htmlFor={props.name}
						onClick={handleLabelClick}>
						{props.option}
					</label>
				</div>
			</section>
		</>
	);
};

export default InputLabel;
