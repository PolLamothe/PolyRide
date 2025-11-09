import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Account from "./pages/Account.jsx";
import ProtectedRoute from "./pages/auth/ProtectedRoute.jsx";
import Auth from "./pages/auth/Auth.jsx";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route element={<ProtectedRoute />} >
                <Route path="/account" element={<Account />} />
            </Route>
            <Route path="/auth" element={<Auth />}>
                <Route index element={<Navigate to="/auth/login" replace />} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
            </Route>
            <Route path="*" element={<h1>404 Not found</h1>} />
        </Routes>
    </BrowserRouter>
)


