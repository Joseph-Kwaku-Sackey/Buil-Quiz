import { forwardRef } from "react";
import { useOptionValue, useGeneralState } from "../customHooks/customHooks";

type clickHandlerType = {
	handleBtnSubmitClick?: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => void;
};

const GenBtn = forwardRef<HTMLButtonElement, clickHandlerType>((props, ref) => {
	const { optionValue } = useOptionValue();
  
	return (
		<>
			<button
				className="gen-btn"
				onClick={(e) =>
					props.handleBtnSubmitClick ? props.handleBtnSubmitClick(e) : null
				}
				ref={ref}>
				Submit
			</button>
		</>
	);
});
export default GenBtn;
