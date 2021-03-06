import React, { Suspense, useState, useEffect, useCallback, useContext } from "react";
import { useHistory, useParams } from "react-router";
import { io } from "socket.io-client";
import axios from "axios";

import { SERVER_URL, FALLBACK_VID } from "../../util/url";

import Chatbox from "../../components/ChatBox/Chatbox";
import VideoLinker from "../../components/VideoLinker/VideoLinker";
import Watchmates from "../../components/Watchmates/Watchmates";
import UserContext from "../../components/Context/UserContext";
import RoomDrawer from "../../components/RoomDrawer/RoomDrawer";
import { RoomPageWrapper, RoomContainerWrapper } from "./Room.styled";
import TimeoutModal from "../../components/TimeoutModal/TimeoutModal";
import Spinner from "../../components/Spinner/Spinner";

const VideoPlayer = React.lazy(() => import("../../components/VideoPlayer/VideoPlayer"));

function Room() {
	const { id } = useParams();
	const [user, setUser] = useState({});
	const [users, setUsers] = useState([]);
	const [isWaiting, setIsWaiting] = useState(true);
	const [isLinkerDisabled, setIsLinkerDisabled] = useState(false);
	const [isChatDisabled, setIsChatDisabled] = useState(false);
	const [chatSocket, setChatSocket] = useState(null);
	const [videoSocket, setVideoSocket] = useState(null);
	const [roomInfo, setRoomInfo] = useState({});
	const [isTimeoutPromptOpen, setIsTimeoutPromptOpen] = useState(false);

	const history = useHistory();
	const { userInfo } = useContext(UserContext);

	// Handle changing of video URL
	const linkCallback = (url) => {
		setRoomInfo({ ...roomInfo, url });
	};

	// Handle changing of room settings
	const receiveSettings = useCallback(
		(newCapacity, newUsers) => {
			const newUser = newUsers.filter((u) => u.userId === userInfo.userId)[0];
			setUser(newUser);
			setUsers(newUsers);
			if (!isNaN(newCapacity)) {
				setRoomInfo({ ...roomInfo, newCapacity });
			}
		},
		[roomInfo, userInfo]
	);
	const saveCallback = (newCapacity, newUsers) => {
		const newUser = newUsers.filter((u) => u.userId === userInfo.userId)[0];
		setUser(newUser);
		setUsers(newUsers);
		chatSocket.emit("SEND_ROOM_SETTINGS", id, newCapacity, newUsers);
		if (!isNaN(newCapacity)) {
			setRoomInfo({ ...roomInfo, capacity: newCapacity });
		}
	};

	// Handle kicking of users
	const receiveKick = useCallback(
		(userId) => {
			if (userId === user.userId) {
				history.push("/");
			}
		},
		[user, history]
	);
	const kickCallback = (userId) => {
		chatSocket.emit("SEND_KICK", id, userId);
	};

	const openTimout = () => {
		setIsTimeoutPromptOpen(true);
	};

	const closeTimeout = () => {
		setIsTimeoutPromptOpen(false);
	};

	// Guide user to join room, retrieve room's info and connect to its sockets
	const joinRoom = async (userId, roomId) => {
		try {
			await axios.post(`${SERVER_URL}/api/rooms/join`, {
				userId,
				roomId,
			});
		} catch (err) {
			throw err;
		}
	};
	const retrieveRoomInfo = async (roomId) => {
		try {
			const roomRes = await axios.get(`${SERVER_URL}/api/rooms/${roomId}`);
			let newRoomInfo = roomRes.data.room;
			if (!newRoomInfo.url || newRoomInfo.url.length === 0) {
				newRoomInfo.url = FALLBACK_VID;
			}
			setRoomInfo(roomRes.data.room);
		} catch (err) {
			throw err;
		}
	};
	const establishSockets = (sockets, userId) => {
		sockets.chat = io(`${SERVER_URL}/chat`);
		sockets.video = io(`${SERVER_URL}/video`, {
			query: { userId },
		});
		setChatSocket(sockets.chat);
		setVideoSocket(sockets.video);
	};
	useEffect(() => {
		const sockets = { chat: null, video: null };
		const getUsers = axios.get(`${SERVER_URL}/api/rooms/${id}/users`);
		const getCapacityCount = axios.get(`${SERVER_URL}/api/rooms/${id}/count`);
		Promise.all([getUsers, getCapacityCount]).then(async (res) => {
			try {
				const usersFound = res[0].data;
				const userIds = usersFound.map((entry) => entry.userId);
				const { capacity, count } = res[1].data;

				if (userIds.includes(userInfo.userId)) {
					history.push(`/room/${id}/alreadyin`);
				} else if (count && capacity && count >= capacity) {
					history.push(`/room/${id}/full`);
				} else {
					await joinRoom(userInfo.userId, id);
					await retrieveRoomInfo(id);
					establishSockets(sockets, userInfo.userId);
					setUsers(usersFound);
				}
			} catch (err) {
				history.push("/room_notfound");
			}
		});

		return () => {
			if (sockets.chat && sockets.video) {
				sockets.chat.disconnect();
				sockets.video.disconnect();
			}
		};
	}, [id, history, userInfo.userId]);

	// Tag socket ID with user's ID
	useEffect(() => {
		if (videoSocket && userInfo) {
			videoSocket.emit("SUBSCRIBE_USER_TO_SOCKET", userInfo.userId);
		}
	}, [videoSocket, userInfo]);

	// Refresh the list of users and settings
	const updateUserList = useCallback(
		async (userList, hostId) => {
			try {
				const res = await axios.get(`${SERVER_URL}/api/rooms/${id}/users`);
				const newUsers = res.data.filter((user) => userList.includes(user.userId));
				newUsers.forEach((u, i) => {
					newUsers[i] = { ...u, isHost: u.userId === hostId };
					// Shift current user to the 1st in the List
					if (u.userId === userInfo.userId) {
						const currUser = newUsers.splice(i, 1)[0];
						newUsers.unshift(currUser);
						setUser(currUser);
					}
				});
				setUsers(newUsers);
			} catch (err) {
				console.error(err);
			}
		},
		[setUsers, userInfo, id]
	);

	// Attach/Deattach event on/off the chat socket
	useEffect(() => {
		if (chatSocket) {
			chatSocket.on("update-user-list", updateUserList);
			chatSocket.on("RECEIVE_ROOM_SETTINGS", receiveSettings);
			chatSocket.on("RECEIVE_KICK", receiveKick);
			return () => {
				chatSocket.off("update-user-list", updateUserList);
				chatSocket.off("RECEIVE_ROOM_SETTINGS", receiveSettings);
				chatSocket.off("RECEIVE_KICK", receiveKick);
			};
		}
	}, [chatSocket, updateUserList, receiveSettings, receiveKick]);

	// Enable/disable chatbox and linker based on settings
	useEffect(() => {
		if (user) {
			setIsChatDisabled(!user.canChat);
			setIsLinkerDisabled(!user.canVideo);
		}
	}, [user]);

	return (
		<RoomPageWrapper>
			<RoomContainerWrapper isWaiting={isWaiting}>
				<div className="room-player">
					<div className="room-res-wrapper">
						{isWaiting && (
							<div className="room-join-fallback">
								<Spinner message="Joining..." />
							</div>
						)}
						<Suspense>
							<VideoPlayer
								users={users}
								user={user}
								socket={videoSocket}
								roomId={id}
								isWaiting={isWaiting}
								setIsWaiting={setIsWaiting}
								roomInfo={roomInfo}
								setRoomInfo={setRoomInfo}
								finishCallback={openTimout}
							/>
						</Suspense>
					</div>
				</div>
				<div className="room-sidebar">
					<VideoLinker isDisabled={isLinkerDisabled} linkCallback={linkCallback} />
					<Watchmates users={users} />
					<Chatbox socket={chatSocket} roomId={id} isDisabled={isChatDisabled} />
					<RoomDrawer
						roomId={id}
						isHost={user.isHost}
						capacity={roomInfo.capacity}
						users={users}
						kickCallback={kickCallback}
						saveCallback={saveCallback}
					/>
				</div>
				<TimeoutModal isOpen={isTimeoutPromptOpen} closeCallback={closeTimeout} />
			</RoomContainerWrapper>
		</RoomPageWrapper>
	);
}

export default Room;
