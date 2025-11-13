import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Account from "./pages/Account.jsx";
import ProtectedRoute from "./pages/auth/ProtectedRoute.jsx";
import Auth from "./pages/auth/Auth.jsx";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import About from "./pages/About.jsx";
import Schedule from "./pages/Schedule.jsx";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/about" element={<About />} />
            <Route path="/schedule" element={<Schedule />} />
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


