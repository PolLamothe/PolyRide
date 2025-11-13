import {Outlet, useNavigate} from "react-router-dom";
import polyrideLogo from "../../assets/PolyRide_LOGO-removebg-preview.png";
import {useEffect} from "react";
import polyrideDAO from "../../dao/PolyrideDAO.js";

function Auth() {
    const navigate = useNavigate();

    useEffect(() => {
        polyrideDAO.fetchAuthentication().then(isAuthenticated => {
            if (isAuthenticated) {
                return navigate("/account");
            }
        }).catch(e => {
            console.log(`AUTH >> Authentication failed ${e.message}`);
        })
    });

    return (
        <>
            <img
                src={polyrideLogo}
                alt="Pokapi Logo"
                style={logoStyle}
            />
            <Outlet />
        </>
    );
}

const logoStyle = {
    height: "auto",
    width: "100%",
    maxWidth: "300px",
    filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.2))",
}

export default Auth;
