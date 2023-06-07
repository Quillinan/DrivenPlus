import styled from "styled-components";
import { useParams } from "react-router-dom";

export default function SubscriptionDetailsPage() {
  const { ID_DO_PLANO } = useParams();
  console.log(ID_DO_PLANO);

  const plans = [
    { id: "1", img: "/DrivenPlus1.svg", price: "39,99" },
    { id: "2", img: "/DrivenPlus2.svg", price: "69,99" },
    { id: "3", img: "/DrivenPlus3.svg", price: "99,99" },
  ];

  const selectedPlan = plans.find((plan) => plan.id === ID_DO_PLANO);

  return (
    <>
      {selectedPlan ? (
        <PageContainer>
          <img src={selectedPlan.img} alt="Planimage" />
          <TopicLine>
            <img src="../../../public/Benefitsicon.svg" alt="topicicon" />
            Benefícios:
          </TopicLine>
          <TopicLine>
            <img src="/Priceicon.svg" alt="topicicon" />
            Preço: {selectedPlan.price}
          </TopicLine>
        </PageContainer>
      ) : (
        <p>Plano não encontrado</p>
      )}
    </>
  );
}

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  p {
    font-family: "Roboto";
    font-size: 24px;
    font-weight: 700;
    color: #ffffff;
  }
`;

const TopicLine = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  font-family: "Roboto";
  color: #ffffff;
`;
