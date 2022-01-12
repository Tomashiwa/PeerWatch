import styled from "styled-components";

const LandingPageWrapper = styled.div`
	display: grid;
	grid-template-columns: auto;
	place-items: center;

	background: ${(props) => props.theme.lightGray};
	height: 100%;

	h3,
	h5 {
		color: ${(props) => props.theme.white};
	}

	.landing-room-center {
		align-self: end;

		width: 50%;

		display: grid;
		grid-template-row: none;
		grid-template-columns: 1fr 1fr;
		grid-row-gap: 0em;
		grid-column-gap: 1em;
		grid-auto-rows: minmax(300px, auto);

		@media (max-width: 1000px) {
			width: 85%;

			grid-template-row: 1fr 1fr;
			grid-template-columns: none;
			grid-row-gap: 1em;
			grid-column-gap: 0em;
		}
	}

	.landing-room-bottom {
		align-self: start;

		width: 60%;
		padding-top: 20px;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.landing-account-center {
		width: 30%;

		@media (max-width: 1000px) {
			min-height: 30%;
			width: auto;
		}
	}

	@media (max-width: 1000px) {
		min-height: 100%;
		height: auto;
	}
`;

export default LandingPageWrapper;
