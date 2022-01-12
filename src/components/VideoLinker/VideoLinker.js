import React, { useRef } from "react";
import { TextFieldWrapper } from "./VideoLinker.styled";

function VideoLinker({ isDisabled = false, linkCallback }) {
	const inputRef = useRef(null);

	const submitLink = (e) => {
		e.preventDefault();
		linkCallback(inputRef.current.value);
		inputRef.current.value = "";
	};

	return (
		<form onSubmit={submitLink}>
			<TextFieldWrapper
				id="textfield-link"
				disabled={isDisabled}
				inputRef={inputRef}
				placeholder="Enter video link here!"
			/>
		</form>
	);
}

export default VideoLinker;
