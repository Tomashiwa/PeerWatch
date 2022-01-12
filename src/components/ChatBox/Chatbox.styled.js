import styled from "styled-components";

const ChatboxWrapper = styled.div`
	background: ${(props) => props.theme.darkGray};
	padding: 10px;

	display: flex;
	flex-direction: column;

	.chatbox-content {
		height: 90%;
		li {
			overflow-wrap: anywhere;
		}
	}

	.chatbox-input {
		height: 10%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
`;

export default ChatboxWrapper;
