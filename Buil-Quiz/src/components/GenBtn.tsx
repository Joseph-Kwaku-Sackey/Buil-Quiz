import { forwardRef } from "react";
// import { useOptionValue, useGeneralContext } from "../customHooks/customHooks";

type clickHandlerType = {
	handleBtnClick?: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => void;
	name: string;
	classes?: string;
};

const GenBtn = forwardRef<HTMLButtonElement, clickHandlerType>((props, ref) => {
	// const { optionValue } = useOptionValue();

	return (
		<>
			<button
				className={`gen-btn ${props.classes}`}
				onClick={(e) => (props.handleBtnClick ? props.handleBtnClick(e) : null)}
				ref={ref}>
				{props.name}
			</button>
		</>
	);
});
export default GenBtn;
