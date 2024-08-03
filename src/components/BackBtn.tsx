import BackArrow from "../assets/img/back-arrow.svg";
import { useNavigate } from "react-router-dom";

const BackBtn = () => {
	const navigate = useNavigate();

	return (
		<div onClick={()=> {navigate(-1)}} className=" flex items-center h-[50px] w-full ">
			<div className="rotate-[180deg] relative ml-8 max-sm:ml-3">
				<button className=" px-2 py-2 rounded-full">
					<img
						className="max-sm:w-[25px]"
						src={BackArrow}
						alt=""
						width={30}
					/>
				</button>
			</div>
		</div>
	);
};

export default BackBtn;
