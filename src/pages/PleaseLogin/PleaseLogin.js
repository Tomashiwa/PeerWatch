import { Typography } from "@mui/material";
import React from "react";
import { useHistory } from "react-router";
import { ButtonWrapper, PleaseLoginPageWrapper } from "./PleaseLogin.styled";

function PleaseLogin() {
	const history = useHistory();

	const redirect = () => {
		history.push("/");
	};

	return (
		<PleaseLoginPageWrapper>
			<Typography variant="h2">Please login to access this page</Typography>
			<ButtonWrapper onClick={redirect}>Click here</ButtonWrapper>
		</PleaseLoginPageWrapper>
	);
}

export default PleaseLogin;
