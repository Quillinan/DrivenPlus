import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ResetStyle from './style/ResetStyle';
import GlobalStyle from './style/GlobalStyle';
import LoginPage from './components/Login/LoginPage';
import SignUpPage from './components/Sign-up/Sign-upPage';
import SubscriptionsPage from './components/Subscriptions/SubscriptionsPage';
import HomePage from './components/Home/HomePage';
import SubscriptionDetailsPage from './components/SubscriptionDetails/SubscriptionDetailsPage';
import { UserProvider } from './components/UserContext/UserContext';
import UserPage from './components/User/User';
import UpdateUserPage from './components/UpdateUser/UpdateUser';

export default function App() {
  return (
    <UserProvider>
      <ResetStyle />
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/subscriptions" element={<SubscriptionsPage />} />
          <Route
            path="/subscriptions/:ID_DO_PLANO"
            element={<SubscriptionDetailsPage />}
          />
          <Route path="/home" element={<HomePage />} />
          <Route path="/users/:ID_DO_USUARIO" element={<UserPage />} />
          <Route
            path="/users/:ID_DO_USUARIO/update"
            element={<UpdateUserPage />}
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
