import Header from "./Header";
import Footer from "./Footer";
import BgAnimObjects from "./BgAnimObjects";
import { Outlet } from "react-router-dom";
const Layout = () => {
	return (
		<>
			<BgAnimObjects />
			<div className="webpage-container">
				<Header />
				<Outlet />
				<Footer />
			</div>
		</>
	);
};

export default Layout;
