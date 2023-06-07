import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/sign-up");
  };

  return (
    <PageContainer>
      <img src="/Logo Driven.svg" alt="logo" />
      <input placeholder="E-mail" />
      <input placeholder="Senha" />
      <button>ENTRAR</button>
      <p onClick={handleRegisterClick}>Não possui uma conta? Cadastre-se</p>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  img {
    margin-top: 30%;
    margin-bottom: 100px;
  }
  p {
    font-family: "Roboto";
    font-size: 14px;
    font-weight: 400;
    margin-top: 24px;
    text-decoration-line: underline;
    color: #ffffff;
  }
`;
