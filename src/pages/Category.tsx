// import QuestionMarkSVG from "../../public/question-mark.svg";
import { useEffect, useState } from "react";
import { categoryBtnData } from "../components/CategoryBtnData";
import SubGenBtn from "../components/SubGenBtn";
import { useSearchParams } from "react-router-dom";


interface CategoryBtnDataType {
	id: number;
	path: string;
	textContent: string;
}

const Category = () => {
	const [filteredBtn, setFilteredBtn] = useState<CategoryBtnDataType[]>([]);
	const [searchParams, setSearchParams] = useSearchParams();
	const getSearchParams = searchParams.get("searchedCategory");

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilteredBtn([]);
		const searchValue = e.target.value;
		const firstCharacter = searchValue?.charAt(0).toLocaleUpperCase();
		const restOfCharacter = searchValue
			?.slice(1, searchValue.length)
			.toLowerCase();
		const convertedWord = `${firstCharacter}${restOfCharacter}`;
		setSearchParams({ searchedCategory: convertedWord });
	};

	useEffect(() => {
		setFilteredBtn([]);
		categoryBtnData.map((btn) => {
			if (getSearchParams && btn.textContent.includes(getSearchParams)) {
				return setFilteredBtn((prev) => {
					return [...prev, btn];
				});
			}
		});
	}, [getSearchParams]);

	return (
			<section className=" select-none relative text-left ">
				<section className="flex flex-col items-center">
					<div className="w-[420px] mb-4 max-sm:w-[316px] ">
						{/* <h2 className="font-bold">Hi there,</h2> */}
						<p className="text-left">
							Welcome to BQ. Choose your <b>category</b> to take a test.
							<strong className="text-[rgb(205,203,140)]">
								{" "}
								Scroll for more options. {""}
							</strong>
							Happy learning!
						</p>
					</div>
					<div>
						<input
							type="text"
							className="rounded-xl text-center py-2 px-6 relative top-5 bg-transparent focus:outline-1 outline-none focus:border-[#b6f8ff9f] border border-[hsl(0,0%,20%)] placeholder:text-[hsl(0,0%,30%)] "
							placeholder="search category..."
							onChange={(e) => handleSearchChange(e)}
							value={getSearchParams ? getSearchParams : ""}
						/>
					</div>
					<section className=" h-[350px] category-container mt-10 flex px-8 py-4 justify-center w-[90%] overflow-y-scroll">
						<div
							className={`grid ${
								getSearchParams ? " grid-cols-1" : " grid-cols-2"
							} max-sm:grid-cols-1  place-items-center h-fit gap-y-5 gap-x-20 relative  `}>
							{!getSearchParams
								? categoryBtnData.map((btn) => {
										return (
											<SubGenBtn
												key={btn.id}
												path={btn.path}
												textContent={btn.textContent}></SubGenBtn>
										);
								  })
								: filteredBtn.map((btn) => {
										return (
											<SubGenBtn
												key={btn.id}
												path={btn.path}
												textContent={btn.textContent}></SubGenBtn>
										);
								  })}
							{!filteredBtn.length && getSearchParams ? (
								<h2 className="text-[1.1rem] relative top-[10vh] font-bold bg-[rgba(0,0,0,0.1)] py-4 px-8 rounded-xl text-[hsl(0,0%,40%)]">
									Category <br />
									Not Found
								</h2>
							) : null}
						</div>
					</section>
				</section>
			</section>
	);
};

export default Category;
