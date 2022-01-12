import { ListItem } from "@mui/material";
import React from "react";
import { ChatContentWrapper, ListWrapper } from "./ChatContent.styled";

function ChatContent({ messages }) {
	return (
		<ChatContentWrapper>
			<ListWrapper>
				{messages.map((msg) => {
					return <ListItem key={msg.id}>{msg.msg}</ListItem>;
				})}
			</ListWrapper>
		</ChatContentWrapper>
	);
}

export default ChatContent;
