import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Services from './pages/Services';
import ContentEditor from './pages/ContentEditor';
import Messages from './pages/Messages';
import AIGenerator from './pages/AIGenerator';
import Sidebar from './components/Sidebar';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 ml-64 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

const ProtectedRoute = ({ children }: LayoutProps) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return <Layout>{children}</Layout>;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<ProtectedRoute><Services /></ProtectedRoute>} />
        <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
        <Route path="/content" element={<ProtectedRoute><ContentEditor /></ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
        <Route path="/ai" element={<ProtectedRoute><AIGenerator /></ProtectedRoute>} />
        
      </Routes>
    </HashRouter>
  );
};

export default App;