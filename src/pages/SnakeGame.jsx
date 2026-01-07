import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./SnakeGame.css";

const SnakeGame = ({ user }) => {
    const canvasRef = useRef();
    const navigate = useNavigate();
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const directionRef = useRef("RIGHT");
    const scoreRef = useRef(0);

    useEffect(() => {
        if (gameOver) return;

        directionRef.current = "RIGHT";
        scoreRef.current = 0;
        setScore(0);

        const handleKeyDown = (e) => {
            const keys = { 37: "LEFT", 38: "UP", 39: "RIGHT", 40: "DOWN" };
            const newDir = keys[e.keyCode];
            if (!newDir) return;

            const opposites = { LEFT: "RIGHT", RIGHT: "LEFT", UP: "DOWN", DOWN: "UP" };
            if (newDir !== opposites[directionRef.current]) {
                directionRef.current = newDir;
            }
            if ([37, 38, 39, 40].includes(e.keyCode)) e.preventDefault();
        };

        document.addEventListener("keydown", handleKeyDown);

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const box = 20;
        let snake = [{ x: 10 * box, y: 10 * box }];
        let food = {
            x: Math.floor(Math.random() * 19) * box,
            y: Math.floor(Math.random() * 19) * box
        };

        const gameLoop = setInterval(() => {
            let head = { ...snake[0] };

            if (directionRef.current === "LEFT") head.x -= box;
            if (directionRef.current === "UP") head.y -= box;
            if (directionRef.current === "RIGHT") head.x += box;
            if (directionRef.current === "DOWN") head.y += box;

            // Сблъсък със стени или себе си
            if (head.x < 0 || head.x >= 400 || head.y < 0 || head.y >= 400 ||
                snake.some(s => s.x === head.x && s.y === head.y)) {
                clearInterval(gameLoop);
                setGameOver(true);
                if (user) saveScore(scoreRef.current);
                return;
            }

            snake.unshift(head);

            if (head.x === food.x && head.y === food.y) {
                scoreRef.current += 1;
                setScore(scoreRef.current);
                food = {
                    x: Math.floor(Math.random() * 19) * box,
                    y: Math.floor(Math.random() * 19) * box
                };
            } else {
                snake.pop();
            }

            // Рисуване
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, 400, 400);

            // Храна
            ctx.fillStyle = "#e74c3c";
            ctx.fillRect(food.x, food.y, box, box);

            // Змия
            snake.forEach((s, i) => {
                ctx.fillStyle = i === 0 ? "#2ecc71" : "#27ae60";
                ctx.fillRect(s.x, s.y, box, box);
                ctx.strokeStyle = "#000";
                ctx.strokeRect(s.x, s.y, box, box);
            });
        }, 120);

        return () => {
            clearInterval(gameLoop);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [user, gameOver]);

    const saveScore = async (finalScore) => {
        try {
            await fetch("http://localhost:3001/score", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: user, score: finalScore }),
            });
        } catch (e) {
            console.log("Грешка при запис");
        }
    };

    return (
        <div className="game-container">
            <div className="game-box">
                <div className="game-nav">
                    <span>ИГРАЧ: {user || "ГОСТ"}</span>
                    <span>РЕЗУЛТАТ: {score}</span>
                </div>

                <div className="canvas-area">
                    <canvas ref={canvasRef} width="400" height="400"></canvas>

                    {gameOver && (
                        <div className="game-overlay">
                            <h1>КРАЙ</h1>
                            <div className="overlay-btns">
                                <button className="btn-again" onClick={() => setGameOver(false)}>ОПИТАЙ ПАК</button>
                                <button className="btn-menu" onClick={() => navigate("/")}>МЕНЮ</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SnakeGame;