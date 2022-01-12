import { Typography } from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import { useHistory } from "react-router";
import Panel from "../Panel/Panel";
import { ButtonWrapper, FormWrapper, TextFieldWrapper } from "./JoinRoomPanel.styled";
import { validate as uuidValidate } from "uuid";
import UserContext from "../Context/UserContext";
import axios from "axios";
import { SERVER_URL } from "../../util/url";

const ERROR_MSG_INVALID_FORMAT = "Invalid room ID format";
const ERROR_MSG_FULL_ROOM = "The room is full. Please try again later.";
const ERROR_MSG_ALREADY_IN = "You're already in the room!";

function JoinRoomPanel() {
	const inputRef = useRef(null);
	const history = useHistory();
	const { userInfo } = useContext(UserContext);
	const [hasError, setHasError] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const join = (e) => {
		e.preventDefault();

		const id = inputRef.current.value;
		if (!uuidValidate(id)) {
			setHasError(true);
			setErrorMsg(ERROR_MSG_INVALID_FORMAT);
		} else {
			// Reject if the room is not full and the user is not already in
			const getUsers = axios.get(`${SERVER_URL}/api/rooms/${id}/users`);
			const getCapacityCount = axios.get(`${SERVER_URL}/api/rooms/${id}/count`);

			Promise.all([getUsers, getCapacityCount])
				.then((res) => {
					const userIds = res[0].data.map((entry) => entry.userId);
					const { capacity, count } = res[1].data;

					if (userIds.includes(userInfo.userId)) {
						setHasError(true);
						setErrorMsg(ERROR_MSG_ALREADY_IN);
					} else if (count >= capacity) {
						setHasError(true);
						setErrorMsg(ERROR_MSG_FULL_ROOM);
					} else {
						setHasError(false);
						setErrorMsg("");
						history.push(`/room/${id}`);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<Panel>
			<Typography variant="h5">Jump in with your friends!</Typography>
			<FormWrapper onSubmit={join}>
				<TextFieldWrapper
					id="textfield-join-code"
					placeholder="Enter room code here..."
					inputRef={inputRef}
					error={hasError}
					helperText={hasError ? errorMsg : ""}
				/>
				<ButtonWrapper variant="contained" type="submit">
					Join
				</ButtonWrapper>
			</FormWrapper>
		</Panel>
	);
}

export default JoinRoomPanel;
