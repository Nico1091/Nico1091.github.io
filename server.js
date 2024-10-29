const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3001;

// Middleware para analizar JSON en el cuerpo de la solicitud
app.use(express.json());

// Servir archivos estáticos (como index.html y script.js)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para enviar el archivo JSON
app.get('/data', (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'data.json'));
});

// Ruta PUT para actualizar el archivo JSON
app.put('/data/:id', (req, res) => {
    const id = req.params.id; // ID del elemento a actualizar
    const updatedData = req.body; // Datos a actualizar

    // Leer el archivo JSON
    const filePath = path.join(__dirname, 'data', 'data.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer el archivo JSON' });
        }

        let jsonData;
        try {
            jsonData = JSON.parse(data);
        } catch (parseErr) {
            return res.status(500).json({ error: 'Error al parsear el archivo JSON' });
        }

        // Buscar el índice del objeto a actualizar por el `id`
        const index = jsonData.findIndex(item => item.id === id);

        if (index === -1) {
            return res.status(404).json({ error: 'Elemento no encontrado' });
        }

        // Actualizar los datos del objeto
        jsonData[index] = { ...jsonData[index], ...updatedData };

        // Guardar los cambios en el archivo JSON
        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al escribir en el archivo JSON' });
            }
            res.status(200).json({ message: 'Elemento actualizado correctamente' });
        });
    });
});

// Servir index.html en la raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

