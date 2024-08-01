import "./App.css";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import BgAnimObjects from "./components/BgAnimObjects";

function App() {
	return (
		<>
			<BgAnimObjects />
			<div className="webpage-container">
				<Header />
				<Content />
				<Footer />
			</div>
		</>
	);
}

export default App;
