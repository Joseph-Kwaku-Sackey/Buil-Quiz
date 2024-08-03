import { useNavigate } from "react-router-dom";
import classes from "../styles/module/globalStyle.module.css";

const Home = () => {
	const { categoryButton } = classes;
	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/quiz");
	};

	return (
		<>
			<section className="flex flex-col justify-center items-center relative min-h-[80dvh] top-[50vh] -translate-y-1/2 ">
				<div className=" text-[.95rem] w-[290px] text-left">
					<h2 className="mb-[.8em] font-bold">Hi there,</h2>
					<p className="">
						Welcome to BQ. Choose your <b>category</b> to have a test.
						<i> Happy learning!</i>
					</p>
				</div>
				<div className="flex flex-col justify-center items-center gap-4 relative w-[60%] h-[200px]">
					<button
						onClick={handleClick}
						className={categoryButton}>
						General Knowledge
					</button>
					<button
						onClick={handleClick}
						className={categoryButton}>
						Tech
					</button>
				</div>
			</section>
		</>
	);
};

export default Home;
