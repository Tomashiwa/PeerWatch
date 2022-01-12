import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Typography } from "@mui/material";
import { ButtonWrapper } from "./CreateRoomPanel.styled";
import axios from "axios";
import Panel from "../Panel/Panel";
import UserContext from "../Context/UserContext";
import { SERVER_URL } from "../../util/url";

function CreateRoomPanel() {
	const { userInfo } = useContext(UserContext);
	const history = useHistory();

	const create = () => {
		const roomId = uuidv4();

		const newRoom = {
			roomId,
			hostId: userInfo.userId,
		};
		axios
			.post(`${SERVER_URL}/api/rooms/create`, newRoom)
			.then((createRes) => {
				history.push(`/room/${newRoom.roomId}`);
			})
			.catch((createErr) => {
				console.log(createErr);
			});
	};

	return (
		<Panel>
			<Typography variant="h5">Host a room for your friends!</Typography>
			<ButtonWrapper variant="contained" onClick={create}>
				Create room
			</ButtonWrapper>
		</Panel>
	);
}

export default CreateRoomPanel;
