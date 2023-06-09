import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const API_URL = 'https://mock-api.driven.com.br/api/v4/driven-plus/users/';

export default function UpdateUserPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [formUser, setFormUser] = useState({
    name: '',
    cpf: '',
    email: '',
    currentPassword: '',
    newPassword: '',
  });
  console.log(user);

  const handleInputChange = (e) => {
    setFormUser({ ...formUser, [e.target.name]: e.target.value });
  };

  const handleReturnClick = () => {
    navigate(`/users/${user.id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = {
      name: formUser.name,
      cpf: user.cpf,
      email: formUser.email,
      currentPassword: formUser.currentPassword,
      newPassword: formUser.newPassword,
    };

    if (formData.name == '') {
      formData.name = user.name;
    }
    if (formData.email == '') {
      formData.email = user.email;
    }
    if (formUser.newPassword == '') {
      delete formData.newPassword;
    }

    try {
      console.log(formData);
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        user.name = formData.name;
        user.cpf = formData.cpf;
        user.email = formData.email;

        if (formData.newPassword) {
          user.password = formData.newPassword;
        } else {
          user.password = formData.currentPassword;
        }

        localStorage.setItem('user', JSON.stringify(user));

        navigate(`/users/${user.id}`);
      } else {
        alert('Falha ao atualizar os dados do usuário. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao processar a solicitação:', error);
      alert(
        'Ocorreu um erro ao processar a solicitação. Tente novamente mais tarde.'
      );
    }
  };

  return (
    <PageContainer>
      <TopBar>
        <img
          src="/returnicon.svg"
          alt="returnicon"
          onClick={handleReturnClick}
        />
      </TopBar>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder={user.name}
          value={formUser.name}
          onChange={handleInputChange}
        />
        <input
          name="cpf"
          placeholder={user.cpf}
          value={formUser.email}
          onChange={handleInputChange}
          disabled
        />
        <input
          name="email"
          placeholder={user.email}
          value={formUser.email}
          onChange={handleInputChange}
        />
        <input
          name="currentPassword"
          placeholder="Senha atual"
          value={formUser.currentPassword}
          onChange={handleInputChange}
        />
        <input
          name="newPassword"
          placeholder="Nova senha"
          value={formUser.newPassword}
          onChange={handleInputChange}
        />
        <button type="submit">SALVAR</button>
      </form>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  p {
    font-family: 'Roboto';
    font-size: 14px;
    font-weight: 400;
    margin-top: 24px;
    text-decoration-line: underline;
    color: #ffffff;
  }
`;

const TopBar = styled.div`
  display: flex;
  width: -webkit-fill-available;
  flex-direction: row;
  margin: 20px 0 84px 20px;
  top: 0;
  img {
    width: 28px;
    height: 32px;
    transform: matrix(1, 0, 0, -1, 0, 0);
    margin-bottom: 0;
  }
`;
