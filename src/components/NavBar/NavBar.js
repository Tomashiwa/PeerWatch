import { Typography } from "@mui/material";
import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { NavBarWrapper, ButtonWrapper } from "./NavBar.styled";

function NavBar() {
	const location = useLocation();
	const history = useHistory();

	const returnHome = () => {
		history.push("/");
	};

	return (
		<NavBarWrapper>
			{location.pathname !== "/" && (
				<ButtonWrapper onClick={returnHome}>{"< Back to Home"}</ButtonWrapper>
			)}
			<Typography variant="h4">PeerWatch</Typography>
		</NavBarWrapper>
	);
}

export default NavBar;
