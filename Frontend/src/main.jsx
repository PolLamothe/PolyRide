import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Account from "./pages/Account.jsx";
import Auth from "./pages/auth/Auth.jsx";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import About from "./pages/About.jsx";
import Schedule from "./pages/Schedule.jsx";

// Composant pour vérifier si l'utilisateur est connecté
function ProtectedRoute({ children }) {
  // À remplacer par ta vraie logique d'authentification
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  return isAuthenticated ? children : <Navigate to="/auth/login" replace />;
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      {/* Page d'accueil PUBLIQUE - accessible sans connexion */}
      <Route path="/" element={<Home />} />

      {/* Routes d'authentification PUBLIQUES */}
      <Route path="/auth" element={<Auth />}>
        <Route index element={<Navigate to="/auth/login" replace />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>

      {/* Pages PROTÉGÉES - nécessitent une connexion */}
      <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
      <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
      <Route path="/schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
      <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />

      {/* Route par défaut */}
      <Route path="*" element={<h1>404 - Page non trouvée</h1>} />
    </Routes>
  </BrowserRouter>
);