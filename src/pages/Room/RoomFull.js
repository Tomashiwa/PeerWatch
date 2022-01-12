import { Typography } from "@mui/material";
import React from "react";
import { useHistory, useParams } from "react-router";
import { ButtonWrapper } from "../../components/ChatBox/ChatInput.styled";
import { ButtonContainerWrapper, FullPageWrapper } from "./RoomFull.styled";

function RoomFull() {
	const { id } = useParams();
	const history = useHistory();

	const tryAgain = () => {
		history.push(`/room/${id}`);
	};

	const redirect = () => {
		history.push("/");
	};

	return (
		<FullPageWrapper>
			<Typography variant="h2">This room is full right now...</Typography>
			<Typography variant="body1">
				You may try to enter again or return back to Home.
			</Typography>
			<ButtonContainerWrapper>
				<ButtonWrapper onClick={tryAgain}>Try again</ButtonWrapper>
				<ButtonWrapper onClick={redirect}>Back to Home</ButtonWrapper>
			</ButtonContainerWrapper>
		</FullPageWrapper>
	);
}

export default RoomFull;
