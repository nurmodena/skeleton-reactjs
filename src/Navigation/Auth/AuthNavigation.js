import React, { Component, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginScreen from '../../Screen/Login/LoginScreen';
import SelectLanguageScreen from '../../Screen/Login/SelectLanguageScreen';


const ToLogin = () => {
  return <Navigate to="/login" replace={true} />;
};

const AuthNavigation = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/selectlanguage" element={<SelectLanguageScreen />} />
        <Route path="*" element={<ToLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AuthNavigation;
