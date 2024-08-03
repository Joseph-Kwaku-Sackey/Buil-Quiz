import { useNavigate, useNavigation } from "react-router-dom";

type propsType = {
	path: string;
	textContent: string;
	customStyle?: string;
};

const SubGenBtn = (props: propsType) => {
	const navigate = useNavigate();
	const navigation = useNavigation();
	const handleClick = (path: string) => {
		navigate(path);
	};
	return (
		<button
			onClick={() => handleClick(`${props.path}`)}
			className={`categoryButton   ${
				props.customStyle ||
				"py-[.8em] px-[1.5em] max-sm:py-[.5em] max-sm:px-[2em]"
			}`}>
			{navigation.state === "idle" ? props.textContent : "Loading..."}
		</button>
	);
};

export default SubGenBtn;
