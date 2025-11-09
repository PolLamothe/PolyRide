import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Account from "./pages/Account.jsx";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/account" element={<Account />} />
      <Route path="*" element={<h1>404 Not found</h1>} />
    </Routes>
  </BrowserRouter>
)
