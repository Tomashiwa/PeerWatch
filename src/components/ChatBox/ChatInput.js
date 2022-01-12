import React, { useRef } from "react";
import { ButtonWrapper, ChatInputWrapper, TextFieldWrapper } from "./ChatInput.styled";

function ChatInput({ isDisabled = false, onSubmit }) {
	const inputRef = useRef(null);

	const submitMsg = (e) => {
		e.preventDefault();
		if (inputRef.current.value.length > 0) {
			onSubmit(inputRef.current.value);
			inputRef.current.value = "";
		}
	};

	return (
		<form onSubmit={submitMsg}>
			<ChatInputWrapper>
				<TextFieldWrapper
					id="textfield-chat-input"
					disabled={isDisabled}
					data-cy="chat-input"
					className="chatinput-textfield"
					inputRef={inputRef}
					placeholder="Chat here..."
					size="small"
				/>
				<ButtonWrapper
					className="chatinput-btn"
					variant="contained"
					onClick={submitMsg}
					disabled={isDisabled}
				>
					Submit
				</ButtonWrapper>
			</ChatInputWrapper>
		</form>
	);
}

export default ChatInput;
