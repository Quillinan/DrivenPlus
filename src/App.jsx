import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResetStyle from "./style/ResetStyle";
import GlobalStyle from "./style/GlobalStyle";
import LoginPage from "./components/Login/LoginPage";
import SignUpPage from "./components/Sign-up/Sign-upPage";
import SubscriptionsPage from "./components/Subscriptions/SubscriptionsPage";
import HomePage from "./components/Home/HomePage";

export default function App() {
  return (
    <>
      <ResetStyle />
      <GlobalStyle />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/subscriptions" element={<SubscriptionsPage />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
