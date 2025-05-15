const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Configuración de conexión
const config = {
  user: 'admin',
  password: 'mssqldatabase',
  server: 'database-1.cls28w4sc51e.us-east-2.rds.amazonaws.com', // o IP de tu servidor SQL
  database: 'auditorias',
  port: 1433,
  options: {
    encrypt: false, // usar true si es Azure
    trustServerCertificate: true,
  },
};

// Ruta para ejecutar querys
app.post('/query', async (req, res) => {
  const { query } = req.body;
  try {
    await sql.connect(config);
    const result = await sql.query(query);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor backend en http://localhost:3000');
});