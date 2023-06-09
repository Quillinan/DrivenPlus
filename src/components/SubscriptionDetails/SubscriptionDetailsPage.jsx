import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function SubscriptionDetailsPage() {
  const { ID_DO_PLANO } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [subscriptionInfo, setSubscriptionInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const token = JSON.parse(localStorage.getItem('user')).token;
  const [cardInfo, setCardInfo] = useState({
    cardName: '',
    cardNumber: '',
    securityNumber: 0,
    expirationDate: '',
  });
  const navigate = useNavigate();
  console.log(ID_DO_PLANO);

  useEffect(() => {
    const fetchSubscriptionInfo = async () => {
      try {
        const response = await fetch(
          `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${ID_DO_PLANO}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setSubscriptionInfo(data);
        } else {
          console.error('Erro na requisição');
        }
        setLoading(false);
      } catch (error) {
        console.error('Erro na requisição', error);
        setLoading(false);
      }
    };

    fetchSubscriptionInfo();
  }, [ID_DO_PLANO, token]);

  const handleSubscribe = () => {
    setShowPopup(true);
  };

  const handleReturnClick = () => {
    navigate('/subscriptions');
  };

  const handleCardInputChange = (e) => {
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
  };

  const handleConfirmSubscription = async () => {
    console.log(
      JSON.stringify({
        membershipId: ID_DO_PLANO,
        cardName: cardInfo.cardName,
        cardNumber: cardInfo.cardNumber,
        securityNumber: Number(cardInfo.securityNumber),
        expirationDate: cardInfo.expirationDate,
      })
    );
    try {
      const response = await fetch(
        'https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            membershipId: ID_DO_PLANO,
            cardName: cardInfo.cardName,
            cardNumber: cardInfo.cardNumber,
            securityNumber: Number(cardInfo.securityNumber),
            expirationDate: cardInfo.expirationDate,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const storedUser = JSON.parse(localStorage.getItem('user'));
        storedUser.membership = data.membership;
        localStorage.setItem('user', JSON.stringify(storedUser));
        navigate('/home');
      } else {
        alert('Falha ao confirmar a assinatura. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao confirmar a assinatura:', error);
      alert(
        'Ocorreu um erro ao confirmar a assinatura. Tente novamente mais tarde.'
      );
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!subscriptionInfo.id) {
    return <p>Plano não encontrado</p>;
  }

  return (
    <>
      <PageContainer>
        <TopBar>
          <img
            src="/returnicon.svg"
            alt="returnicon"
            onClick={handleReturnClick}
          />
        </TopBar>
        <BoxContainer>
          <img src={subscriptionInfo.image} alt="Planimage" />
          <p>{subscriptionInfo.name}</p>
        </BoxContainer>
        <BoxContainer>
          <TopicLine>
            <img src="/perkicon.svg" alt="topicicon" />
            Benefícios:
          </TopicLine>
          <DetailBox>
            <ol>
              {subscriptionInfo.perks.map((perk) => (
                <li key={perk.id}>
                  <a href={perk.link} target="_blank" rel="noopener noreferrer">
                    {perk.title}
                  </a>
                </li>
              ))}
            </ol>
          </DetailBox>

          <TopicLine>
            <img src="/priceicon.svg" alt="topicicon" />
            Preço:
          </TopicLine>
          <DetailBox>
            R$ {subscriptionInfo.price} cobrados mensalmente
          </DetailBox>
        </BoxContainer>
        <BoxContainer>
          <InputContainer>
            <input
              placeholder="Nome impresso no cartão"
              name="cardName"
              value={cardInfo.cardName}
              onChange={handleCardInputChange}
            />
            <input
              placeholder="Dígitos do cartão"
              name="cardNumber"
              value={cardInfo.cardNumber}
              onChange={handleCardInputChange}
            />
            <InputLine>
              <input
                placeholder="Código de segurança"
                name="securityNumber"
                value={cardInfo.securityNumber}
                onChange={handleCardInputChange}
              />
              <input
                placeholder="Validade"
                name="expirationDate"
                value={cardInfo.expirationDate}
                onChange={handleCardInputChange}
              />
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
                <p>
                  {subscriptionInfo.name} (R$ {subscriptionInfo.price})?
                </p>
                <PopupButtons>
                  <CancelButton onClick={() => setShowPopup(false)}>
                    Não
                  </CancelButton>
                  <button onClick={handleConfirmSubscription}>SIM</button>
                </PopupButtons>
              </PopupContent>
            </PopupContainer>
          </>
        )}
      </PageContainer>
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
  a {
    font-size: 14px;
    font-family: 'Roboto';
    color: #ffffff;
    text-decoration-line: none;
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
