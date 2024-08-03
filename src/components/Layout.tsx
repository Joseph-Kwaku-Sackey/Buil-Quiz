import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import BackBtn from "./BackBtn";

const Layout = () => {
	const location = useLocation()
	return (
		<>
			<div className="webpage-container">
				<header className="h-[50px]">
					<Header />
				</header>
				<main className="flex-1 flex gap-5 flex-col">
					{location.pathname !== "/" && <BackBtn />}
					<Outlet />
				</main>
				<footer className="h-[50px]">
					<Footer />
				</footer>
			</div>
		</>
	);
};

export default Layout;
