import styled from "styled-components";

const AppWrapper = styled.div`
	height: 100%;
	max-height: 100%;

	display: grid;
	grid-template-rows: auto 1fr;

	background: ${(props) => props.theme.lightGray};

	.app-content {
		overflow: auto;
	}

	.center-screen {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		height: 100%;
	}
`;

export default AppWrapper;
