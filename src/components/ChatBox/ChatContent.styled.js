import styled from "styled-components";
import { styled as mStyled } from "@mui/material/styles";
import { List } from "@mui/material";
import { theme } from "../../styles//theme";

export const ChatContentWrapper = styled.div`
	background: ${(props) => props.theme.darkGray};
	height: 100%;
	li {
		color: ${(props) => props.theme.white};
		font-size: ${(props) => props.theme.fontSize};
		font-family: ${(props) => props.theme.fontFamily};
	}
`;

export const ListWrapper = mStyled(List)({
	overflow: "auto",
	maxHeight: "100%",
	padding: "0px",
	"&::-webkit-scrollbar": {
		width: "0.75em",
	},
	"&::-webkit-scrollbar-track": {
		boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
		webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
	},
	"&::-webkit-scrollbar-thumb": {
		backgroundColor: theme.white,
		outline: "1px solid slategrey",
	},
});
