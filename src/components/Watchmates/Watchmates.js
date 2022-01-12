import { ListItem, Typography } from "@mui/material";
import { ListWrapper, WatchmatesWrapper } from "./Watchmates.styled";
import React from "react";

function Watchmates({ users }) {
	return (
		<WatchmatesWrapper className="watchmates">
			<Typography align="center">{`Watchmates (${users.length})`}</Typography>
			<ListWrapper>
				{users.map((user) => {
					return (
						<ListItem key={user.userId}>{`${user.displayName} ${
							user.isHost ? "(Host)" : ""
						}`}</ListItem>
					);
				})}
			</ListWrapper>
		</WatchmatesWrapper>
	);
}

export default Watchmates;
