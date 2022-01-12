import styled from "styled-components";
import { styled as mStyled } from "@mui/material/styles";
import { Modal, Button } from "@mui/material";
import { theme } from "../../styles/theme";

export const ModalWrapper = mStyled(Modal)`
	position: fixed;
    z-index: 1300;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ContentWrapper = styled.div`
	width: 40%;
	height: 50%;
	padding: 15px;
	background: ${(props) => props.theme.darkGray};

	display: grid;
	grid-template-rows: ${(props) =>
		props.hasError ? "auto auto auto 4fr 1fr" : "auto auto 5fr 1fr"};
	grid-row-gap: 0.5em;

	.settings-title {
		color: ${(props) => props.theme.orange};
	}

	.settings-capacity {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;

		.capacity-text {
			color: ${(props) => props.theme.white};
		}

		.capacity-input {
			width: 20%;
			background: ${(props) => props.theme.white};
			color: ${(props) => props.theme.darkGray};
			border-radius: 5px;
		}

		p {
			margin-right: 15px;
		}
	}

	.capacity-error {
		color: red;
	}

	.settings-table {
		min-width: 0;
		min-height: 0;
	}

	.settings-btns {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		column-gap: 1em;
	}
`;

export const ButtonWrapper = mStyled(Button)({
	background: theme.orange,
	color: theme.darkGray,
	":hover": {
		background: theme.darkOrange,
	},
});
