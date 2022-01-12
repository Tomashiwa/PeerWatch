import { Typography } from "@mui/material";
import React from "react";
import { useHistory } from "react-router";
import { NotFoundPageWrapper, ButtonWrapper } from "./RoomNotFound.styled";

function RoomNotFound() {
	const history = useHistory();

	const redirect = () => {
		history.push("/");
	};

	return (
		<NotFoundPageWrapper>
			<Typography variant="h2">This room cannot be found...</Typography>
			<ButtonWrapper onClick={redirect}>Back to Home</ButtonWrapper>
		</NotFoundPageWrapper>
	);
}

export default RoomNotFound;
