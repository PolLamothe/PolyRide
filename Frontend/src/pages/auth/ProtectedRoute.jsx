import { Navigate, Outlet, useNavigate } from "react-router-dom";
import polyrideDAO from "../../dao/PolyrideDAO.js";
import { useEffect, useState } from "react";

function ProtectedRoute({ redirectPath = '/auth/login' }) {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const token = document.cookie.includes("token=");
        if (!token) {
            navigate(redirectPath);
        } else {
            setIsAuthenticated(true);
        }
    }, []);

    if (isAuthenticated === null) return null;

    return <Outlet />;
}

export default ProtectedRoute;
