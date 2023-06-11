import { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext/UserContext';
import LoadingAnimation from '../Loading/Loading';

const API_URL = 'https://mock-api.driven.com.br/api/v4/driven-plus/auth/login';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const { membership } = data;

        localStorage.setItem('user', JSON.stringify(data));

        if (membership !== null) {
          navigate('/home');
        } else {
          navigate('/subscriptions');
        }
      } else {
        alert('Usuário ou senha inválidos. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Ocorreu um erro na requisição. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = () => {
    navigate('/sign-up');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      if (parsedUser.membership !== null) {
        navigate('/home');
      } else {
        navigate('/subscriptions');
      }
    }
  }, [navigate, setUser]);

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <PageContainer>
      <img src="/Logo Driven.svg" alt="logo" />
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          name="password"
          placeholder="Senha"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button type="submit">ENTRAR</button>
      </form>
      <p onClick={handleRegisterClick}>Não possui uma conta? Cadastre-se</p>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 134px;
  img {
    margin-bottom: 100px;
  }
  p {
    font-family: 'Roboto';
    font-size: 14px;
    font-weight: 400;
    margin-top: 24px;
    text-decoration-line: underline;
    color: #ffffff;
  }
`;
