const sql = require('mssql');
const express = require('express');
const path = require('path');
const cors = require('cors');
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

/*
export const getConnection = async () => {
    try {
        const pool = await sql.connect(dbConfig);
        return pool;
    } catch (err) {
        console.error('Error de conexión a la base de datos:', err);
        throw err;
    }
};*/

app.use(express.json());
app.use(express.static(path.join(__dirname, 'src/pages/sign-in')));

// Ruta para ejecutar consultas SQL
app.post('/query', async (req, res) => {
    const { query } = req.body;
    try {
        console.log('Conectando a la base de datos...');
        const pool = await sql.connect(dbConfig);
        console.log('Conexión exitosa a la base de datos');
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        console.log('Error al ejecutar la consulta:', err);
        
        res.status(500).json({ error: err.message });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/pages/sign-in', 'sign-in.html'));
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});