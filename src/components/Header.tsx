import { Link } from "react-router-dom";
import BuilLogo from "../../public/buil-quiz-logo-w.svg";
import { useContextApi } from "../customHooks/customHooks";
import { funcReset } from "../utilities/CommonFunc";

const Header = () => {
	const { globalQuizValueStatusDispatch, modeTransitionDispatch } =
		useContextApi();
	return (
		<>
			<header className="header">
				<Link
					to={"/"}
					onClick={() =>
						funcReset(
							"logo",
							globalQuizValueStatusDispatch,
							modeTransitionDispatch
						)
					}>
					<div className="ml-20 max-sm:ml-8">
						<img
							src={BuilLogo}
							alt="logo"
							className="logo-container__logo"
							width={30}
						/>
						{/* <h1 className=" text-[.9rem] font-bold">Buil Quiz</h1> */}
					</div>
				</Link>
			</header>
		</>
	);
};

export default Header;
