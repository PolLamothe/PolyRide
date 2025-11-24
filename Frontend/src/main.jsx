import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Account from "./pages/Account.jsx";
import Auth from "./pages/auth/Auth.jsx";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import About from "./pages/About.jsx";
import Schedule from "./pages/Schedule.jsx";
import Tracking from "./pages/Tracking.jsx";
import TutoEDT from './pages/TutoEDT.jsx';

const appBasename = import.meta.env.VITE_ROUTER_BASE || '/';

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={appBasename}>
    <Routes>
      {/* Page d'accueil accessible sans authentification */}
      <Route path="/" element={<Home />} />

      {/* Autres pages principales */}
      <Route path="/search" element={<Search />} />
      <Route path="/about" element={<About />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/account" element={<Account />} />
      <Route path="/tracking" element={<Tracking />}/>
      <Route path="/tutoedt" element={<TutoEDT />}/>

      {/* Routes d'authentification */}
      <Route path="/auth" element={<Auth />}>
        <Route index element={<Navigate to="/auth/login" replace />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>

      {/* Route par défaut si aucune autre ne correspond */}
      <Route path="*" element={<h1>404 - Page non trouvée</h1>} />
    </Routes>
  </BrowserRouter>
);
