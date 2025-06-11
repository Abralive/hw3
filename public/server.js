const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
const saltRounds = 10;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // 替換為你的 MySQL 密碼
    database: "phish_db"
});

db.connect((err) => {
    if (err) throw err;
    console.log("✅ Connected to MySQL");
});

app.post("/api/register", async (req, res) => {
    const { account, password } = req.body;

    if (!account || !password) {
        return res.status(400).send("帳號與密碼不可為空");
    }

    const hash = await bcrypt.hash(password, saltRounds);
    const sql = "INSERT INTO login_logs (account, password) VALUES (?, ?)";

    db.query(sql, [account, hash], (err) => {
        if (err) {
            console.error("❌ 註冊失敗：", err);
            return res.status(500).send("註冊失敗");
        }
        res.send("✅ 註冊成功");
    });
});

app.post("/api/login", (req, res) => {
    const { account, password } = req.body;

    if (!account || !password) {
        return res.status(400).send("帳號與密碼不可為空");
    }

    const sql = "SELECT * FROM login_logs WHERE account = ?";
    db.query(sql, [account], async (err, results) => {
        if (err) {
            console.error("❌ 查詢失敗：", err);
            return res.status(500).send("伺服器錯誤");
        }

        if (results.length === 0) {
            return res.status(401).send("帳號不存在");
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            res.send("✅ 登入成功");
        } else {
            res.status(401).send("❌ 密碼錯誤");
        }

    });
});

app.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
});
