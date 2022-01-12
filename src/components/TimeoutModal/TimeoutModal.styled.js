import styled from "styled-components";
import { styled as mStyled } from "@mui/material/styles";
import { Modal } from "@mui/material";

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
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	background: ${(props) => props.theme.darkGray};
	padding: 30px;

	h4,
	span {
		color: ${(props) => props.theme.orange};
	}

	h6,
	p {
		color: ${(props) => props.theme.white};
	}
`;
