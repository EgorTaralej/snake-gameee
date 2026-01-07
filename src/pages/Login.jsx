import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

const Login = ({ setUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();

            if (res.ok) {
                setUser(data.username);
                navigate("/");
            } else {
                setMsg(data.message);
            }
        } catch (err) {
            setMsg("Грешка при връзка със сървъра.");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-box">
                <h2>ВХОД</h2>
                <form onSubmit={handleLogin}>
                    <input 
                        type="text" 
                        placeholder="Потребител" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Парола" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <button type="submit" className="btn-primary">ВЛЕЗ</button>
                </form>

                {msg && <p className="error-msg">{msg}</p>}

                <div className="auth-redirect">
                    <span>Нямаш профил? </span>
                    <Link to="/register" className="redirect-link">Създай го тук</Link>
                </div>

                <button className="btn-back" onClick={() => navigate("/")}>НАЗАД</button>
            </div>
        </div>
    );
};

export default Login;