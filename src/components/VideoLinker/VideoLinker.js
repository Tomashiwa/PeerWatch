import React, { useRef, useState } from "react";
import { TextFieldWrapper } from "./VideoLinker.styled";

const REGEX_YOUTUBE_URL =
	/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

const ERROR_MSG_INVALID_LINK = "Invalid link. Please try again with another link!";

function VideoLinker({ isDisabled = false, linkCallback }) {
	const [hasError, setHasError] = useState(false);
	const inputRef = useRef(null);

	const submitLink = (e) => {
		e.preventDefault();

		const link = inputRef.current.value;
		if (!link.match(REGEX_YOUTUBE_URL)) {
			setHasError(true);
			return;
		}

		setHasError(false);
		linkCallback(link);
		inputRef.current.value = "";
	};

	return (
		<form onSubmit={submitLink}>
			<TextFieldWrapper
				id="textfield-link"
				disabled={isDisabled}
				inputRef={inputRef}
				placeholder="Enter video link here!"
				error={hasError}
				helperText={hasError ? ERROR_MSG_INVALID_LINK : " "}
			/>
		</form>
	);
}

export default VideoLinker;
