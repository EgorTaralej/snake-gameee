import React from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Menu = ({ user, logout }) => {
    const navigate = useNavigate();

    return (
        <div className="auth-page">
            <div className="auth-box">
                <h1>SNAKE ONLINE</h1>
                <div className="auth-content">
                    {user ? (
                        <>
                            <p className="welcome-text">Здравей, <span>{user}</span>!</p>
                            <button className="btn-primary" onClick={() => navigate("/snake")}>ИГРАЙ</button>
                            <button className="btn-secondary" onClick={logout}>ИЗХОД</button>
                        </>
                    ) : (
                        <>
                            <button className="btn-primary" onClick={() => navigate("/login")}>ВХОД</button>
                            <button className="btn-primary" onClick={() => navigate("/register")}>РЕГИСТРАЦИЯ</button>
                            <div className="separator">или</div>
                            <button className="btn-guest" onClick={() => navigate("/snake")}>ИГРАЙ КАТО ГОСТ</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Menu;