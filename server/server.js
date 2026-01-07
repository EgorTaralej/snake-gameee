const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3001;
const DATA_FILE = './users.json';

app.use(cors());
app.use(express.json());
const getUsers = () => {
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify([]));
        return [];
    }
    try {
        const data = fs.readFileSync(DATA_FILE);
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
};

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const users = getUsers();
    if (users.find(u => u.username === username)) {
        return res.status(400).json({ message: "Потребителят вече съществува!" });
    }
    users.push({ username, password, highScore: 0 });
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
    res.json({ message: "Регистрацията е успешна!" });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.json({ username: user.username, highScore: user.highScore });
    } else {
        res.status(401).json({ message: "Грешно име или парола!" });
    }
});

app.post('/score', (req, res) => {
    const { username, score } = req.body;
    let users = getUsers();
    const userIndex = users.findIndex(u => u.username === username);
    if (userIndex !== -1) {
        if (score > users[userIndex].highScore) {
            users[userIndex].highScore = score;
            fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
        }
        res.json({ highScore: users[userIndex].highScore });
    } else {
        res.status(404).json({ message: "Потребителят не е намерен" });
    }
});

app.get('/', (req, res) => {
    res.send("Сървърът е онлайн!");
});

app.listen(PORT, () => {
    console.log(`Сървърът работи на http://localhost:${PORT}`);
});