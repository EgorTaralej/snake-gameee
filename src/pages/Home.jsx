import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = ({ user, setUser }) => {
    const navigate = useNavigate();

    return (
        <div className="menu-container">
            <h1>SNAKE GAME</h1>
            <div className="button-group">
                {user ? (
                    <>
                        <p>Здравей, <strong>{user}</strong>!</p>
                        <button onClick={() => navigate("/snake")}>Играй</button>
                        <button className="secondary" onClick={() => setUser(null)}>Изход</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => navigate("/login")}>Вход</button>
                        <button onClick={() => navigate("/register")}>Регистрация</button>
                        <button className="guest" onClick={() => navigate("/snake")}>Играй като гост</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;