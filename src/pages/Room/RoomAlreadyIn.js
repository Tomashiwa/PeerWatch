import { Typography } from "@mui/material";
import React from "react";
import { useHistory, useParams } from "react-router";
import { ButtonWrapper } from "../../components/ChatBox/ChatInput.styled";
import { AlreadyInPageWrapper, ButtonContainerWrapper } from "./RoomAlreadyIn.styled";

function RoomAlreadyIn() {
	const { id } = useParams();
	const history = useHistory();

	const tryAgain = () => {
		history.push(`/room/${id}`);
	};

	const redirect = () => {
		history.push("/");
	};

	return (
		<AlreadyInPageWrapper>
			<Typography variant="h2">You are already in this room</Typography>
			<Typography variant="body1">
				If you want to watch here, please leave the room on the active tab and try again.
			</Typography>
			<ButtonContainerWrapper>
				<ButtonWrapper onClick={tryAgain}>Try again</ButtonWrapper>
				<ButtonWrapper onClick={redirect}>Back to Home</ButtonWrapper>
			</ButtonContainerWrapper>
		</AlreadyInPageWrapper>
	);
}

export default RoomAlreadyIn;
