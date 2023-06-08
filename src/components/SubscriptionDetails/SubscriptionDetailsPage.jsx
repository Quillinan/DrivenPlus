import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SubscriptionDetailsPage() {
  const { ID_DO_PLANO } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [subscriptionInfo, setSubscriptionInfo] = useState({});

  const plans = [
    {
      id: '1',
      img: '/DrivenPlus1.svg',
      price: '39,99',
      benefits: 'Brindes exclusivos,Materiais bônus de web',
    },
    {
      id: '2',
      img: '/DrivenPlus2.svg',
      price: '69,99',
      benefits: 'Aulas bônus de tech',
    },
    {
      id: '3',
      img: '/DrivenPlus3.svg',
      price: '99,99',
      benefits: 'Mentorias personalizadas',
    },
  ];

  const selectedPlan = plans.find((plan) => plan.id === ID_DO_PLANO);

  let benefitsList = [];
  if (selectedPlan) {
    for (let i = 0; i < selectedPlan.id; i++) {
      const planBenefits = plans[i].benefits
        .split(',')
        .map((benefit) => benefit.trim());
      benefitsList.push(...planBenefits);
    }
  }

  const handleSubscribe = () => {
    setShowPopup(true);
    setSubscriptionInfo(selectedPlan);
  };

  const handleConfirmSubscription = () => {
    // Lógica para confirmar a assinatura
    setShowPopup(false);
  };
  return (
    <>
      {selectedPlan ? (
        <PageContainer>
          <TopBar>
            <img src="/returnicon.svg" alt="" />
          </TopBar>
          <BoxContainer>
            <img src={selectedPlan.img} alt="Planimage" />
            <p>Driven Plus</p>
          </BoxContainer>
          <BoxContainer>
            <TopicLine>
              <img src="/benefitsicon.svg" alt="topicicon" />
              Benefícios:
            </TopicLine>
            <DetailBox>
              <ol>
                {benefitsList.map((benefit, index) => (
                  <li key={index}>{`${index + 1}. ${benefit}`}</li>
                ))}
              </ol>
            </DetailBox>

            <TopicLine>
              <img src="/priceicon.svg" alt="topicicon" />
              Preço:
            </TopicLine>
            <DetailBox>R$ {selectedPlan.price} cobrados mensalmente</DetailBox>
          </BoxContainer>
          <BoxContainer>
            <InputContainer>
              <input placeholder="Nome impresso no cartão" />
              <input placeholder="Dígitos do cartão" />
              <InputLine>
                <input placeholder="Código de segurança" />
                <input placeholder="Validade" />
              </InputLine>
              <button onClick={handleSubscribe}>ASSINAR</button>
            </InputContainer>
          </BoxContainer>
          {showPopup && (
            <>
              <PopupContainer>
                <PopupContent>
                  <p>Tem certeza que deseja</p>
                  <p>assinar o plano</p>
                  <p>Driven Plus (R$ {subscriptionInfo.price})?</p>
                  <PopupButtons>
                    <CancelButton onClick={() => setShowPopup(false)}>
                      Não
                    </CancelButton>
                    <StylizedLink
                      to={`/home`}
                      onClick={handleConfirmSubscription}
                    >
                      <button>SIM</button>
                    </StylizedLink>
                  </PopupButtons>
                </PopupContent>
              </PopupContainer>
            </>
          )}
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
    font-family: 'Roboto';
    font-size: 24px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 20px;
  }
  img {
    margin-bottom: 10px;
  }
`;

const TopBar = styled.div`
  display: flex;
  width: -webkit-fill-available;
  flex-direction: row;
  margin: 20px 0 30px 20px;
  img {
    width: 28px;
    height: 32px;
    transform: matrix(1, 0, 0, -1, 0, 0);
    margin-bottom: 0;
  }
`;

const BoxContainer = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  flex-direction: column;
  p {
    font-family: 'Roboto';
    font-size: 24px;
    font-weight: 700;
    color: #ffffff;
  }
`;

const TopicLine = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  font-family: 'Roboto';
  color: #ffffff;
  align-self: start;
  img {
    margin-bottom: 0;
    margin-right: 5px;
  }
`;

const DetailBox = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-family: 'Roboto';
  color: #ffffff;
  margin-top: 5px;
  align-self: start;
  ol {
    margin-top: 5px;
    margin-bottom: 10px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 34px;
`;

const InputLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  input {
    width: 45%;
    padding: 0 6px;
  }
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const PopupContent = styled.div`
  padding-top: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  width: 248px;
  height: 180px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  text-align: center;
  background: #ffffff;
  margin-top: 10px;
  p {
    background: #ffffff;
    color: #000000;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    margin: 0;
  }
`;

const PopupButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background: #ffffff;
  margin-top: 50px;
  button {
    width: 95px;
    height: 52px;
  }
`;

const CancelButton = styled.button`
  background: #cecece;
  color: #ffffff;
  border-radius: 8px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
`;

const StylizedLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  background: #ffffff;
`;
