import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	*{
		background: #0E0E13;
	}
	button {
		height: 52px;
		width: 300px;
		background: #FF4791;	
		border-radius: 8px;
		border-style: none;
		font-family: 'Roboto';
		font-weight: 700;
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		color: #FFFFFF;
		margin-top: 8px;
	}
	input {
		width: 272px;
		height: 52px;
		display: flex;
		align-items: center;
		background: #FFFFFF;
		border-radius: 8px;
		border-style: none;
		color: #7E7E7E;
		font-family: 'Roboto';
		font-size: 14px;
		margin-bottom: 16px;
		padding: 0 14px;
		&::placeholder{
			color: #7E7E7E;
		}
	}
`;

export default GlobalStyle;
