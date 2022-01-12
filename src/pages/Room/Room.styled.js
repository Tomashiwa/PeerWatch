import styled from "styled-components";

export const RoomPageWrapper = styled.div`
	background: ${(props) => props.theme.lightGray};
	min-height: 100%;
	height: auto;

	display: grid;
	grid-template-columns: auto;
	place-items: center;

	@media (max-width: 1000px) {
		height: 100%;
		justify-content: stretch;
		align-items: center;
	}
`;

export const RoomContainerWrapper = styled.div`
	width: 98%;

	display: grid;
	grid-template-rows: none;
	grid-template-columns: 3fr 1fr;
	grid-row-gap: 0em;
	grid-column-gap: 1em;
	align-items: center;
	justify-content: space-evenly;

	.room-player {
		.room-res-wrapper {
			position: relative;
			padding-top: 56.25%;
			.room-join-fallback {
				height: 100%;
				width: 100%;

				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				position: absolute;
				top: 0;
				left: 0;
			}
			.react-player {
				position: absolute;
				top: 0;
				left: 0;
			}
		}
	}

	.room-sidebar {
		height: 80vh;

		display: grid;
		grid-template-rows: auto 4fr 8fr auto;
		grid-row-gap: 1em;

		min-height: 0;
		min-width: 0;

		.watchmates {
			display: block;
		}

		.chatbox {
			overflow: hidden;
			min-width: 0;
		}
	}

	@media (max-width: 1000px) {
		height: 100%;
		max-height: 100%;

		grid-template-rows: auto 1fr;
		grid-template-columns: none;
		grid-row-gap: 1em;
		grid-column-gap: 0em;
		align-items: flex-start;
		justify-content: normal;

		.room-sidebar {
			height: 100%;

			grid-template-rows: auto 1fr auto;

			.watchmates {
				display: none;
			}
		}
	}
`;
