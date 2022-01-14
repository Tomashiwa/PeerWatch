import { useRef, useEffect } from "react";

const usePrevious = function (value) {
	// A container to hold "value"
	const ref = useRef();

	// Update the "value" when it changes
	useEffect(() => {
		ref.current = value;
	}, [value]);

	// Return previous "value" (happens before the above useEFfect)
	return ref.current;
};

export default usePrevious;
