import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Typography } from "@mui/material";
import { ButtonWrapper } from "./CreateRoomPanel.styled";
import axios from "axios";
import Panel from "../Panel/Panel";
import UserContext from "../Context/UserContext";
import { SERVER_URL } from "../../util/url";

const SPINNER_MSG_CREATING = "Creating...";

function CreateRoomPanel() {
	const { userInfo } = useContext(UserContext);
	const [isLoading, setIsLoading] = useState(false);
	const history = useHistory();

	const create = async () => {
		try {
			setIsLoading(true);
			const newRoom = {
				roomId: uuidv4(),
				hostId: userInfo.userId,
			};

			await axios.post(`${SERVER_URL}/api/rooms/create`, newRoom);

			history.push(`/room/${newRoom.roomId}`);
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Panel isLoading={isLoading} loadMsg={SPINNER_MSG_CREATING}>
			<Typography variant="h5">Host a room for your friends!</Typography>
			<ButtonWrapper variant="contained" onClick={create}>
				Create room
			</ButtonWrapper>
		</Panel>
	);
}

export default CreateRoomPanel;
