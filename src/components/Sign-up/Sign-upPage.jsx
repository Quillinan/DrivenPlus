import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/");
  };

  return (
    <PageContainer>
      <input placeholder="Nome" />
      <input placeholder="CPF" />
      <input placeholder="E-mail" />
      <input placeholder="Senha" />
      <button>CADASTRAR</button>
      <p onClick={handleLoginClick}>Já possui uma conta? Entre</p>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 150px;
  p {
    font-family: "Roboto";
    font-size: 14px;
    font-weight: 400;
    margin-top: 24px;
    text-decoration-line: underline;
    color: #ffffff;
  }
`;
