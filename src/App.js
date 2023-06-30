import React from 'react';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthContextProvider } from 'contextApi/AuthContext';
import Admin from 'layouts/Admin';
import AdminLayout from "layouts/Admin.js";
import ForgetPassword from 'pages/Forgetpass';
import { WeatherStationsContextProvider } from 'contextApi/WeatherStationsContext';


function App() {
  return (
     <AuthContextProvider>
      <WeatherStationsContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        
        <Route path="/admin/" element={<Admin />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/forgotpassword" element={<ForgetPassword />} />
      </Routes>
    </BrowserRouter>
    </WeatherStationsContextProvider>
    </AuthContextProvider>
  );
}

export default App;
