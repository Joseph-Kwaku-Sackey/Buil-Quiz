import { useOptionValue, useGeneralState } from "../customHooks/customHooks";
import { useRef } from "react";
import GenBtn from "./GenBtn";

const StatusView = () => {
	const { optionValue } = useOptionValue();
	const { state, dispatch } = useGeneralState();
	const btnRef = useRef<HTMLButtonElement | null>(null);

	const handleBtnSubmitClick = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		if (!optionValue) {
			btnRef.current!.className = "gen-btn-anim gen-btn";
			setTimeout(() => {
				btnRef.current!.className = " gen-btn";
				btnRef.current!.style.background = "rgb(140, 0, 0)";
			}, 300);
			dispatch({ type: "NOT_SELECTED" });
		}
	};
  if(state.isSelected && optionValue){
    btnRef.current!.style.background = "rgb(120, 110, 0)"
  }
  

	return (
		<>
			<section className="min-h-[75px] flex justify-center items-center bg-black rounded-[5px] relative overflow-clip status-view-container">
				<div>
					<p className="status-view-container__level-digit">1 / 5</p>
				</div>
				{/* <div>
					<img
						src=""
						alt=""
					/>
				</div> */}
				<div>
					<GenBtn
						handleBtnSubmitClick={handleBtnSubmitClick}
						ref={btnRef}
					/>
				</div>
			</section>
		</>
	);
};

export default StatusView;
