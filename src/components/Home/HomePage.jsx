import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  console.log(user);

  const handleCancelPlan = async () => {
    try {
      const response = await fetch(
        'https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions',
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.ok) {
        user.membership = null;
        localStorage.setItem('user', JSON.stringify(user));

        navigate('/subscriptions');
      } else {
        alert('Falha ao cancelar o plano. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Ocorreu um erro na requisição. Tente novamente mais tarde.');
    }
  };

  const handleChangePlan = () => {
    navigate('/subscriptions');
  };

  const handleIconClick = () => {
    navigate(`/users/${user.id}`);
  };

  return (
    <PageContainer>
      <Topbar>
        <PlanImg src={user.membership.image} alt="PlanImg" />
        <UserImg src="/usericon.svg" alt="usericon" onClick={handleIconClick} />
      </Topbar>
      <p>Olá {user.name}</p>
      <ButtonsPlan>
        {user.membership.perks.map((perk) => (
          <a
            key={perk.id}
            href={perk.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {perk.title}
          </a>
        ))}
      </ButtonsPlan>
      <Footer>
        <button onClick={handleChangePlan}>Mudar plano</button>
        <CancelButton onClick={handleCancelPlan}>Cancelar plano</CancelButton>
      </Footer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  align-items: center;
  color: #ffffff;
`;

const Topbar = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 22px;
  width: 300px;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const PlanImg = styled.img`
  height: 50.866729736328125px;
  width: 74.52371215820312px;
  margin-top: 10px;
`;

const UserImg = styled.img`
  width: 34px;
  height: 34px;
`;

const ButtonsPlan = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  a {
    height: 52px;
    width: 300px;
    background: #ff4791;
    border-radius: 8px;
    border-style: none;
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #ffffff;
    margin-top: 8px;
    text-decoration-line: none;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  bottom: 12px;
  position: fixed;
`;

const CancelButton = styled.button`
  background: #ff4747;
`;
