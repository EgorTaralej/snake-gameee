import React from "react";
import { Link } from "react-router-dom";

const Header = ({ user, setUser }) => {
    return (
        <header style={{ padding: "10px", background: "#333", color: "#fff", display: "flex", justifyContent: "space-around" }}>
            <Link to="/snake" style={{ color: "white" }}>Игра</Link>
            {!user ? (
                <>
                    <Link to="/login" style={{ color: "white" }}>Вход</Link>
                    <Link to="/register" style={{ color: "white" }}>Регистрация</Link>
                </>
            ) : (
                <>
                    <span>Здравей, {user}!</span>
                    <button onClick={() => setUser(null)}>Изход</button>
                </>
            )}
        </header>
    );
};

export default Header;