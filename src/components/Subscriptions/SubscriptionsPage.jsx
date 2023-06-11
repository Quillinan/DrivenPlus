import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import LoadingAnimation from '../Loading/Loading';

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const token = JSON.parse(localStorage.getItem('user')).token;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleBoxClick = (id) => {
    navigate(`/subscriptions/${id}`);
  };

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch(
          'https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setSubscriptions(data);
        } else {
          console.error('Erro na requisição');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [token]);

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <PageContainer>
      <p>Escolha seu Plano</p>
      {subscriptions.map((subscription) => (
        <BoxContainer
          key={subscription.id}
          onClick={() => handleBoxClick(subscription.id)}
        >
          <img src={subscription.image} alt="" />
          <p>{`R$ ${subscription.price}`}</p>
        </BoxContainer>
      ))}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  p {
    font-family: 'Roboto';
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
    font-family: 'Roboto';
    font-size: 24px;
    font-weight: 700;
    color: #ffffff;
    margin-left: 20px;
  }
`;

// const StylizedLink = styled(Link)`
//   text-decoration: none;
//   color: inherit;
// `;
