// import { useOptionValue, useGeneralContext } from "../customHooks/customHooks";

type clickHandlerType = {
	handleBtnClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	name: string;
	styleClass?: string;
	color?: string;
	refBtn: React.MutableRefObject<HTMLButtonElement | null>;
};

const GenBtn = ({
	handleBtnClick,
	name,
	styleClass,
	color,
	refBtn,
}: clickHandlerType) => {
	return (
		<>
			<button
				className={`gen-btn rounded-[5px] ${color} ${styleClass}`}
				onClick={(e) => (handleBtnClick ? handleBtnClick(e) : null)}
				ref={refBtn}>
				{name}
			</button>
		</>
	);
};
export default GenBtn;
