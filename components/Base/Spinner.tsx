import { ThemeContext } from "styled-components";
import { Theme } from "../../style/style";
import { useContext } from "react";
import Loader from "react-spinners/PulseLoader";

const Spinner = () => {
	const theme = useContext<Theme>(ThemeContext);

	return (
		<Loader margin={5} color={theme.textColor} size={15} loading={true} />
	);
};

export default Spinner;
