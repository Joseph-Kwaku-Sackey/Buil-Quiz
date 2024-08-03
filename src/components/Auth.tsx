import { redirect } from "react-router-dom";

export const Auth = () => {
	const auth = false;

	if (!auth) {
		throw redirect("/login?error=Try logging in first!");
	}

	return null;
};
