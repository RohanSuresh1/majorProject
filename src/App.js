import React from 'react';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthContextProvider } from 'contextApi/AuthContext';
import Admin from 'layouts/Admin';
import AdminLayout from "layouts/Admin.js";

function App() {
  return (
     <AuthContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
