

const Footer = () => {
	const date = new Date();
	const year = date.getFullYear();
	
	return (
		<>
			<footer className="max-sm:text-[.7rem]">Copyright &copy; {year} Builvec : All rights reserved.</footer>
		</>
	);
};

export default Footer;
