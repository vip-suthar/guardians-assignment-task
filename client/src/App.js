import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import ProfilePage from "./pages/Profile";
import SearchPage from "./pages/SearchPage";
import ResetPasswordPage from "./pages/ResetPassword";
import ForgotPasswordPage from "./pages/ForgotPassword";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/forgot" element={<ForgotPasswordPage />} />
        <Route path="/reset" element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
