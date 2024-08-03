import { Link } from "react-router-dom";
import QuestionMarkSVG from "../../public/question-mark.svg";
import BgAnimObjects from "../components/BgAnimObjects";

const Home = () => {
	return (
		<>
			<section className="home-container flex justify-center h-full select-none bg-[rgba(0,0,0,0.55)]">
				<div>
					<BgAnimObjects />
				</div>
				<div className=" flex flex-col my-8 items-center justify-center ">
					<div className="flex flex-col relative max-sm:w-[275px] tracking-tighter w-[500px]">
						<h1 className="font-black bg-gradient-to-r from-[rgb(200,200,200)] to-[rgb(250,250,250)] text-transparent text-left text-[3rem] max-sm:text-[2.2rem] bg-clip-text leading-[1.5ch] ">
							Explore over{" "}
							<span className="bg-clip-text text-transparent font-black bg-gradient-to-r from-blue-400 to-red-400">
								20+ academic disciplines
							</span>{" "}
						</h1>
						<p className="tracking-[.0ch] max-sm:text-[.92rem] w-[400px] max-sm:w-full bg-gradient-to-l from-[rgb(125,125,125)] to-[rgb(250,250,250)] text-transparent bg-clip-text mt-2 text-left">
							Test your knowledge by taking quizes from multiple academic field
							of studies.
						</p>
					</div>
					<Link
						to={"/category"}
						className="mt-40 ">
						<button className="bg-gradient-to-tr from-[rgb(61,21,219)] to-[rgb(80,48,210)] hover:brightness-[1.2] text-white rounded-full px-16 py-3">
							Let's Go
						</button>
					</Link>	
					<p className="max-sm:text-[.9rem] mt-36 text-[rgb(101,101,101)] ">
						Embark on a free and educative adventure. <br /> Proceed{" "}
						<span className="text-blue-500 ">without signing up/in</span>.
					</p>
				</div>
				<div className="absolute md:left-[45em] -z-10 max-sm:top-[15em] opacity-[.02] max-sm:opacity-0 top-[10em]">
					<img
						src={QuestionMarkSVG}
						alt="question-mark-svg"
						className="w-[500px] max-sm:w-[350px] max-sm:ml-5 "
						width={100}
					/>
				</div>
			</section>
		</>
	);
};

export default Home;
