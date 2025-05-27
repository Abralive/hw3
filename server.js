const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// 修改以下連線資訊為你的 MySQL 帳號
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Win335549',
    database: 'price_analysis'
});

app.get('/api/price', (req, res) => {
    const { product, year, month } = req.query;

    const sql = `
    SELECT year, month, price
    FROM product_prices
    WHERE product_name = ?
      AND year = ?
      AND month = ?
    LIMIT 1;
  `;

    db.query(sql, [product, year, month], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: '查無資料' });
        res.json(results[0]);
    });
});

app.listen(3000, () => {
    console.log('✅ API 伺服器已啟動：http://localhost:3000');
});


