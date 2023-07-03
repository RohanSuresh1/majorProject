import React from 'react';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthContextProvider } from 'contextApi/AuthContext';
import Admin from 'layouts/Admin';
import AdminLayout from "layouts/Admin.js";
import ForgetPassword from 'pages/Forgetpass';
import { WeatherStationsContextProvider } from 'contextApi/WeatherStationsContext';
import Sensor from 'pages/Sensor';
import UserView from 'pages/UserView';
import Dashboard from 'pages/Dashboard';
import Changepass from 'pages/Changepass';

function App() {
  return (
     <AuthContextProvider>
      <WeatherStationsContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/Changepass" element={<Changepass />} />
        <Route path="/admin/" element={<Admin />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        {/* <Route path="/forgotpassword" element={<ForgetPassword />} /> */}
        {/* <Route path="/sensor" element={<Sensor />} />
        <Route path="/userview" element={<UserView />} /> */}
        
      </Routes>
    </BrowserRouter>
    </WeatherStationsContextProvider>
    </AuthContextProvider>
  );
}

export default App;
