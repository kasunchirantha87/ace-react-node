import React from 'react';
//import logo from './logo.svg';
import { Routes, Route, Router, BrowserRouter } from "react-router-dom";
import './App.css';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import Dashboard from './pages/dashboard/Dashboard';
//import { Dashboard } from './pages/dashboard/Dashboard';
//import Layout from './pages/layout/Layout';
import LoginPage from './pages/login/Login';
import Register from './pages/register/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
