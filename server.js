const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors'); // Asegúrate de que esta línea esté aquí

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'Nico1091', 
    host: 'localhost',
    database: 'base_de_datos', 
    password: 'tu_contraseña', 
    port: 5432,
});

// Middleware
app.use(cors()); // Esto habilita CORS
app.use(bodyParser.json());

// Ruta para guardar información
app.post('/guardar', async (req, res) => {
    const { nombre, correoElectronico, telefono } = req.body;

    try {
        await pool.query(
            'INSERT INTO tu_tabla (nombre, correo_electronico, telefono) VALUES ($1, $2, $3)',
            [nombre, correoElectronico, telefono]
        );
        res.status(201).send({ message: 'Información guardada con éxito' });
    } catch (error) {
        console.error('Error al guardar información:', error);
        res.status(500).send({ message: 'Error al guardar información' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
