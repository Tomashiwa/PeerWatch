import React, { useEffect, useRef, useState } from "react";
import { TextField, Typography } from "@mui/material";
import { ButtonWrapper, ContentWrapper, ModalWrapper } from "./RoomSettings.styled";
import RoomTable from "./RoomTable";
import axios from "axios";
import { SERVER_URL } from "../../util/url";

const ROOM_CAPACITY = 15;
const ERROR_MSG_EXCEED_RANGE = `Capacity must be from 1 to ${ROOM_CAPACITY}`;
const ERROR_MSG_LOWER_THAN_EXISTING = `Cannot be lower than the number of users in room`;

function RoomSettings({ roomId, capacity, users, kickCallback, saveCallback }) {
	const [open, setOpen] = useState(false);
	const [currUsers, setCurrUsers] = useState({});
	const [error, setError] = useState("");
	const capacityRef = useRef(null);

	const openModel = () => {
		setOpen(true);
	};

	const closeModal = () => {
		setOpen(false);
	};

	const updateCapacity = async (roomId, capacity) => {
		try {
			await axios.put(`${SERVER_URL}/api/rooms/capacity`, { roomId, capacity });
		} catch (err) {
			console.error(err);
		}
	};
	const updateSettings = async (settings) => {
		try {
			await axios.put(`${SERVER_URL}/api/rooms/settings`, settings);
		} catch (err) {
			console.error(err);
		}
	};
	const save = async () => {
		try {
			const newCapacity = parseInt(capacityRef.current.value);
			if (isNaN(newCapacity)) {
				setError("");
			} else if (newCapacity <= 0 || newCapacity > 15) {
				setError(ERROR_MSG_EXCEED_RANGE);
				return;
			} else if (newCapacity < users.length) {
				setError(ERROR_MSG_LOWER_THAN_EXISTING);
				return;
			} else {
				setError("");
				await updateCapacity(roomId, newCapacity);
			}

			const newSettings = {
				roomId,
				users: currUsers,
			};
			await updateSettings(newSettings);

			saveCallback(newCapacity, currUsers);
			closeModal();
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		setCurrUsers(users);
	}, [users]);

	return (
		<>
			<ButtonWrapper variant="contained" onClick={openModel}>
				Settings
			</ButtonWrapper>
			<ModalWrapper open={open} onClose={closeModal}>
				<ContentWrapper hasError={error.length > 0}>
					<Typography className="settings-title" variant="h5">
						Room settings
					</Typography>
					<div className="settings-capacity">
						<Typography className="capacity-text">Capacity:</Typography>
						<TextField
							id="textfield-settings-capacity"
							className="capacity-input"
							type="number"
							size="small"
							placeholder={`${capacity}`}
							inputRef={capacityRef}
							error={error.length > 0}
						/>
					</div>
					{error.length > 0 && <span className="capacity-error">{error}</span>}
					<div className="settings-table">
						<RoomTable
							users={currUsers}
							setUsers={setCurrUsers}
							kickCallback={kickCallback}
						/>
					</div>
					<div className="settings-btns">
						<ButtonWrapper variant="contained" onClick={save}>
							Save
						</ButtonWrapper>
						<ButtonWrapper variant="contained" onClick={closeModal}>
							Cancel
						</ButtonWrapper>
					</div>
				</ContentWrapper>
			</ModalWrapper>
		</>
	);
}

export default RoomSettings;
