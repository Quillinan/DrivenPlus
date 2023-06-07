import styled from "styled-components";
import { Link } from "react-router-dom";

export default function SubscriptionsPage() {
  return (
    <PageContainer>
      <p>Escolha seu Plano</p>
      <StylizedLink to={`/subscriptions/${String(1)}`}>
        <BoxContainer>
          <img src="/DrivenPlus1.svg" alt="" />
          <p>R$ 39,99</p>
        </BoxContainer>
      </StylizedLink>
      <StylizedLink to={`/subscriptions/${String(2)}`}>
        <BoxContainer>
          <img src="/DrivenPlus2.svg" alt="" />
          <p>R$ 69,99</p>
        </BoxContainer>
      </StylizedLink>
      <StylizedLink to={`/subscriptions/${String(3)}`}>
        <BoxContainer>
          <img src="/DrivenPlus3.svg" alt="" />
          <p>R$99,99</p>
        </BoxContainer>
      </StylizedLink>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  p {
    font-family: "Roboto";
    font-size: 32px;
    font-weight: 400;
    margin-top: 30px;
    margin-bottom: 24px;
    color: #ffffff;
  }
`;

const BoxContainer = styled.div`
  height: 174px;
  display: flex;
  align-items: center;
  flex-direction: row;
  border: 3px solid #7e7e7e;
  border-radius: 12px;
  padding: 0 12px;
  margin-bottom: 10px;
  p {
    font-family: "Roboto";
    font-size: 24px;
    font-weight: 700;
    color: #ffffff;
    margin-left: 20px;
  }
`;

const StylizedLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
