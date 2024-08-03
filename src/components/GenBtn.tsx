import { forwardRef } from "react";
// import { useOptionValue, useGeneralContext } from "../customHooks/customHooks";

type clickHandlerType = {
	handleBtnClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	name: string;
	class?: string;
	color?: string;
};

const GenBtn = forwardRef<HTMLButtonElement, clickHandlerType>((props, ref) => {
	return (
		<>
			<button
				className={`gen-btn rounded-[5px] ${props.class} ${props.color}`}
				onClick={(e) => (props.handleBtnClick ? props.handleBtnClick(e) : null)}
				ref={ref}>
				{props.name}
			</button>
		</>
	);
});
export default GenBtn;
