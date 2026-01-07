import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Register = ({ setUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) return setMsg("Паролите не съвпадат!");

        try {
            const res = await fetch("http://localhost:3001/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();

            if (res.ok) {
                setUser(username); // Автоматично логване
                navigate("/snake");
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
                <h2>РЕГИСТРАЦИЯ</h2>
                <form onSubmit={handleRegister}>
                    <input type="text" placeholder="Потребител" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input type="password" placeholder="Парола" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <input type="password" placeholder="Повтори парола" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    <button type="submit" className="btn-primary">СЪЗДАЙ ПРОФИЛ</button>
                </form>
                {msg && <p className="error-msg">{msg}</p>}
                <button className="btn-back" onClick={() => navigate("/")}>НАЗАД</button>
            </div>
        </div>
    );
};

export default Register;