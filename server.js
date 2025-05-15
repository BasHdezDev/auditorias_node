const express = require('express');
const sql = require('mssql');
const path = require('path');
const app = express();
const port = 3000;

// Configura la conexión a tu base de datos MSSQL
const dbConfig = {
    user: 'admin',
    password: 'mssqldatabase',
    server: 'database-1.cls28w4sc51e.us-east-2.rds.amazonaws.com', // e.g., 'localhost'
    database: 'auditorias',
    port: 1433,
    options: {
        encrypt: true, // Usa true si estás en Azure
        trustServerCertificate: true // Usa true para desarrollo local
    }
};

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para ejecutar consultas SQL
app.post('/query', async (req, res) => {
    const { query } = req.body;
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});