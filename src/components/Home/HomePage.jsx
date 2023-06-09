import styled from 'styled-components';

export default function HomePage() {
  const userPlan = 1;

  const renderAdditionalButtons = () => {
    if (userPlan === 2) {
      return (
        <>
          <button>Aulas bônus de tech</button>
        </>
      );
    } else if (userPlan === 3) {
      return (
        <>
          <button>Aulas bônus de tech</button>
          <button>Mentorias personalizadas</button>
        </>
      );
    }
    return null;
  };

  return (
    <PageContainer>
      <Topbar>
        <PlanImg src={`DrivenPlus${userPlan}.svg`} alt="PlanImg" />
        <UserImg src="/usericon.svg" alt="usericon" />
      </Topbar>
      <p>Olá fulano</p>
      <ButtonsPlan>
        <button>Solicitar brindes</button>
        <button>Materiais bônus de web</button>
        {renderAdditionalButtons()}
      </ButtonsPlan>
      <Footer>
        <button>Mudar plano</button>
        <CancelButton>Cancelar plano</CancelButton>
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
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  top: 540px;
  position: fixed;
`;

const CancelButton = styled.button`
  background: #ff4747;
`;
