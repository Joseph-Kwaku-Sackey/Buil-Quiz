import BuilLogo from "../../public/buil-quiz-logo-w.svg";

const Header = () => {
	return (
		<>
			<header className="header">
				<div className="flex items-center gap-[.5em]">
					<img
						src={BuilLogo}
						alt="logo"
						className="logo-container__logo"
						width="13"
					/>
					<h1 className="text-[1.2rem] text-white font-bold">Buil Quiz</h1>
				</div>
			</header>
		</>
	);
};

export default Header;
