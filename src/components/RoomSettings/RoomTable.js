import { Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React, { useContext } from "react";
import { TableContainerWrapper, KickButtonWrapper } from "./RoomTable.styled";
import UserContext from "../../components/Context/UserContext";

function RoomTable({ users, setUsers, kickCallback }) {
	const { userInfo } = useContext(UserContext);

	const toggleChat = (userId) => {
		let newUsers = users.slice().map((user) => {
			const canChat = user.userId === userId ? 1 - user.canChat : user.canChat;
			return { ...user, canChat };
		});
		setUsers(newUsers);
	};

	const toggleVideo = (userId) => {
		let newUsers = users.slice().map((user) => {
			const canVideo = user.userId === userId ? 1 - user.canVideo : user.canVideo;
			return { ...user, canVideo };
		});
		setUsers(newUsers);
	};

	return (
		<TableContainerWrapper>
			<Table stickyHeader>
				<TableHead>
					<TableRow>
						<TableCell>Username</TableCell>
						<TableCell>Chat</TableCell>
						<TableCell>Video</TableCell>
						<TableCell>Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{users.map((user) => (
						<TableRow key={user.userId}>
							<TableCell>{user.displayName}</TableCell>
							<TableCell>
								<Checkbox
									className="table-checkbox"
									checked={user.canChat === 1}
									onChange={() => toggleChat(user.userId)}
								/>
							</TableCell>
							<TableCell>
								<Checkbox
									className="table-checkbox"
									checked={user.canVideo === 1}
									onChange={() => toggleVideo(user.userId)}
								/>
							</TableCell>
							<TableCell>
								<KickButtonWrapper
									variant="contained"
									disabled={user.userId === userInfo.userId}
									onClick={() => kickCallback(user.userId)}
								>
									Kick
								</KickButtonWrapper>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainerWrapper>
	);
}

export default RoomTable;
