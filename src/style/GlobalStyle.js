import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	button {
		height: 52px;
		min-width: 300px;
		background: #FF4791;	
		border-radius: 8px;
		border-style: none;
		font-family: 'Roboto';
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		color: #FFFFFF;
		margin-top: 8px;
	}
	input {
		min-width: 300px;
		height: 52px;
		background: #FFFFFF;
		border-radius: 8px;
		border-style: none;
		padding: 0 14px;
		color: #DBDBDB;
		font-family: 'Roboto';
		font-size: 20px;
		display: flex;
		align-items: center;
		margin-bottom: 16px;
		&::placeholder{
			color: #7E7E7E;
		}
	}
`;

export default GlobalStyle;
