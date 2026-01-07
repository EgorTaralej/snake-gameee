import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SnakeGame from "./pages/SnakeGame";
import './App.css';

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("snakeUser") || null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/snake") {
      navigate("/", { replace: true });
    }
  }, []);

  const loginUser = (username) => {
    setUser(username);
    localStorage.setItem("snakeUser", username);
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("snakeUser");
  };

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Menu user={user} logout={logoutUser} />} />
        <Route path="/login" element={<Login setUser={loginUser} />} />
        <Route path="/register" element={<Register setUser={loginUser} />} />
        <Route path="/snake" element={<SnakeGame user={user} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;