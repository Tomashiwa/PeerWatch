import styled from "styled-components";

export const AccountResetPageWrapper = styled.div`
	background: ${(props) => props.theme.lightGray};
	height: 100%;
	max-height: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	.reset-page-center {
		width: 30%;
	}
`;
