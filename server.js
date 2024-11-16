const express = require('express');
const cors = require('cors');
const connection = require('./Database')

const app = express();
const port = 3000;

app.use(cors())
app.use(express.json());

// Endpoint para obtener todos los clientes
app.get('/clientes', (req, res) => { 
    connection.query('SELECT * FROM Cliente', (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener  clientes.'); 
            return
        }
        if (results.length === 0) {
            res.status(404).send('No se encontraron Clientes');
        }
        res.json(results);
    });
});

app.get('/Departamento', (req, res) => {
    connection.query('SELECT * FROM Departamento', (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener los datos del departamento');
            return
        }
        if (results.length === 0) {
            res.status(404).send('No existen departamentos');
        }
        res.json(results);
    });
});



app.get('/sucursal', (req, res) => { // Cambiado a singular
    connection.query('SELECT * FROM Sucursal', (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener  datos sucursal.'); // Mensaje singular
            return
        }
        if (results.length === 0) {
            res.status(404).send('No se encontraron datos de sucursal');
        }
        res.json(results);
    });
});
app.get('/Cargo', (req, res) => {
    connection.query('SELECT * FROM Cargo', (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener los datos del Cargo');
            return
        }
        if (results.length === 0) {
            res.status(404).send('No existe el Cargo');
        }
        res.json(results);
    });
});

app.get('/Empleado', (req, res) => {
    connection.query('select * from Empleado', (err, results) => {
        if (err) {
            return res.status(500).send('Error al obtener empleado');
        }
        if (err) {
            return res.status(404).send('No se encontrarin datos de empleado y cargo')
        }
        return res.json(results);
    })
})

// Endpoint para obtener datos de un cliente por ID
app.get('/obtenerCliente', (req, res) => {
    const idCliente = req.query.id;

    if (!idCliente) {
        return res.json({ error: 'ID de cliente no proporcionado' });
    }

    const query = 'SELECT Nombre, Apellido, Cedula, Direccion, Telefono, Correo FROM Cliente WHERE Id = ?';
    connection.query(query, [idCliente], (err, results) => { // Usa `connection` en lugar de `db`
        if (err) {
            console.error('Error al obtener datos del cliente:', err);
            return res.json({ error: 'Error al obtener datos del cliente' });
        }

        if (results.length === 0) {
            return res.json({ error: 'Cliente no encontrado' });
        }

        res.json(results[0]);
    });
});



app.get('/obtenerSucursal', (req, res) => {
    const idSucursal = req.query.id;

    if (!idSucursal) {
        return res.json({ error: 'ID de Sucursal no proporcionado' });
    }

    const query = 'SELECT Nombre, Direccion, Ciudad, Codigo_postal,Telefono FROM Sucursal WHERE Id = ?';
    connection.query(query, [idSucursal], (err, results) => { // Usa `connection` en lugar de `db`
        if (err) {
            console.error('Error al obtener datos del Sucursal:', err);
            return res.json({ error: 'Error al obtener datos del Sucursal' });
        }

        if (results.length === 0) {
            return res.json({ error: 'Sucursal no encontrado' });
        }

        res.json(results[0]);
    });
});

// Endpoint para obtener datos de un cliente por ID
app.get('/obtenerDepartamento', (req, res) => {
    const idSucursal = req.query.id;

    if (!idSucursal) {
        return res.json({ error: 'ID de cliente no proporcionado' });
    }

    const query = 'SELECT Nombre, Apellido, Cedula, Direccion, Telefono, Correo FROM Sucursal WHERE Nombre = ?';
    connection.query(query, [NombreCliente], (err, results) => { // Usa `connection` en lugar de `db`
        if (err) {
            console.error('Error al obtener datos del cliente:', err);
            return res.json({ error: 'Error al obtener datos del cliente' });
        }

        if (results.length === 0) {
            return res.json({ error: 'Cliente no encontrado' });
        }

        res.json(results[0]);
    });
});


app.delete('/clientes/eliminar', (req, res) => {
    const { id } = req.body; // Extrae el id del cuerpo de la solicitud
    const borrarquery = 'DELETE FROM Cliente WHERE Id = ?';

    if (!id) {
        return res.status(400).json({ error: 'ID de cliente no proporcionado.' });
    }

    connection.query(borrarquery, [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar el cliente.' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado.' });
        }

        res.json({ message: 'Cliente eliminado exitosamente' });
    });
});

app.delete('/sucursal/eliminar', (req, res) => {
    const { id } = req.body; // Extrae el id del cuerpo de la solicitud
    const borrarquery = 'DELETE FROM Sucursal WHERE Id = ?';

    if (!id) {
        return res.status(400).json({ error: 'ID de sucursal no proporcionado.' });
    }
    connection.query(borrarquery, [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar la sucursal.' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'sucursal no encontrada.' });
        }

        res.json({ message: 'Sucursal eliminada exitosamente' });
    });
});


app.delete('/cargo/eliminar', (req, res) => {
    const { id } = req.body; // Extrae el id del cuerpo de la solicitud
    const borrarquery = 'DELETE FROM Cargo WHERE Id = ?';

    if (!id) {
        return res.status(400).json({ error: 'ID de Cargo no proporcionado.' });
    }

    connection.query(borrarquery, [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar el Cargo.' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Cargo no encontrado.' });
        }

        res.json({ message: 'Cargo eliminado exitosamente' });
    });
});

app.delete('/DepartamenTo/eliminar', (req, res) => {
    const { id } = req.body; // Extrae el id del cuerpo de la solicitud
    const borrarquery = 'DELETE FROM Departamento WHERE Id = ?';

    if (!id) {
        return res.status(400).json({ error: 'ID de Departamento no proporcionado.' });
    }

    connection.query(borrarquery, [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar el Departamento.' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Departamentoente no encontrado.' });
        }

        res.json({ message: 'Departamento eliminado exitosamente' });
    });
});


// Endpoint para agregar un nuevo cliente
app.post('/clientes/agregar', (req, res) => {
    const { Nombre, Apellido, Cedula, Direccion, Telefono, Correo } = req.body;
    // Consulta para verificar si ya existe un cliente con la misma cédula
    const verificarClienteQuery = 'SELECT * FROM Cliente WHERE Cedula = ?';
    connection.query(verificarClienteQuery, [Cedula], (err, results) => {
        if (err) {
            console.error('Error al verificar cliente:', err.message);
            res.status(500).send('Error en la red al verificar el cliente');
            return;
        }
        if (results.length > 0) {
            // Si ya existe un cliente con la misma cédula, no agregamos el cliente
            console.log('El cliente ya esta registrado duply')
            res.status(409).json({ message: 'El cliente con esta cédula ya está registrado' });
        } else {
            // Si no existe, agregamos el cliente
            const agregarClienteQuery = 'INSERT INTO Cliente (Nombre, Apellido, Cedula, Direccion, Telefono, Correo) VALUES (?, ?, ?, ?, ?, ?)';

            connection.query(agregarClienteQuery, [Nombre, Apellido, Cedula, Direccion, Telefono, Correo], (err, results) => {
                if (err) {
                    console.error('Error al agregar cliente:', err.message);
                    res.status(500).send('Error en la red al agregar el cliente');
                } else {
                    res.status(200).json({ message: 'Cliente agregado exitosamente' });
                }
            });
        }
    });
});


// Endpoint para agregar una nueva sucursal
app.post('/sucursal/agregar', (req, res) => {
    const { Nombre, Direccion, Ciudad, Codigo_postal, Telefono } = req.body;
    // Consulta para verificar si ya existe un cliente con la misma cédula
    const verificarSucursalQuery = 'SELECT * FROM Sucursal WHERE Direccion = ?';
    connection.query(verificarSucursalQuery, [Direccion], (err, results) => {
        if (err) {
            console.error('Error al verificar Sucursal:', err.message);
            res.status(500).send('Error en la red al verificar la Sucursal');
            return;
        }
        if (results.length > 0) {
            console.log('La sucursal ya esta registrada duply')
            res.status(409).json({ message: 'ya está registrada una Sucursal con esta Direccion' });
        } else {
            // Si no existe, agregamos el cliente
            const agregarSucursalQuery = 'INSERT INTO Sucursal (Nombre, Direccion, Ciudad, Codigo_postal, Telefono) VALUES (?, ?, ?, ?, ?)';

            connection.query(agregarSucursalQuery, [Nombre, Direccion, Ciudad, Codigo_postal, Telefono], (err, results) => {
                if (err) {
                    console.error('Error al agregar sucursal:', err.message);
                    res.status(500).send('Error en la red al agregar la Sucursal');
                } else {
                    res.status(200).json({ message: 'sucursal agregada exitosamente' });
                }
            });
        }
    });
});


// Endpoint para agregar un nuevo departamento
app.post('/Departamento/agregar', (req, res) => {
    const { Nombre, Descripcion } = req.body; // Asegúrate de que 'Id' esté presente en el cuerpo de la solicitud

    // Consulta para verificar si ya existe un departamento con el mismo Id
    const verificarDepartamentoQuery = 'SELECT * FROM Departamento WHERE Id = ?';
    connection.query(verificarDepartamentoQuery, [Id], (err, results) => {
        if (err) {
            console.error('Error al verificar Departamento:', err.message);
            res.status(500).send('Error en la red al verificar el departamento');
            return;
        }
        if (results.length > 0) {
            // Si ya existe un departamento con el mismo Id, no lo agregamos
            console.log('El Departamento ya está registrado');
            res.status(409).json({ message: 'El Departamento con este Id ya está registrado' });
        } else {
            // Si no existe, agregamos el departamento
            const agregarDepartamentoQuery = 'INSERT INTO Departamento (Id, Nombre, Descripcion) VALUES (?, ?, ?)';

            connection.query(agregarDepartamentoQuery, [Id, Nombre, Descripcion], (err, results) => {
                if (err) {
                    console.error('Error al agregar Departamento:', err.message);
                    res.status(500).send('Error en la red al agregar el Departamento');
                } else {
                    res.status(200).json({ message: 'Departamento agregado exitosamente' });
                }
            });
        }
    });
});


// Ruta para actualizar un cliente
app.put('/actualizarSucursal', (req, res) => {
    const { Nombre, Direccion, Ciudad, Codigo, Telefono } = req.body;

    console.log('Sucursal recibida para actualización:', Nombre);

    // Consulta de actualización directa, verifica si se encuentra y actualiza
    const queryUpdate = 'UPDATE Sucursal SET Nombre = ?, Direccion = ?,Codigo_postal Ciudad = ?, Telefono = ? WHERE Id = ?';
    connection.query(queryUpdate, [Nombre, Direccion, Ciudad, Codigo, Telefono], (error, results) => {
        if (error) {
            console.error('Error al actualizar la Sucursal:', error);
            return res.status(500).json({ error: 'Error al actualizar la Sucursal' });
        }
        if (results.affectedRows === 0) {
            // Si no se encontró ningún registro para actualizar
            return res.status(404).json({ error: 'La Sucursal no existe.' });
        }
        res.status(200).json({ message: 'Sucursal actualizada correctamente' });
    });
});

// Ruta para actualizar un cliente
app.put('/actualizarCliente', (req, res) => {
    const { Cedula, Nombre, Apellido, Direccion, Telefono, Correo } = req.body;

    console.log('Cédula recibida para actualización:', Cedula);

    // Consulta de actualización directa, verifica si se encuentra y actualiza
    const queryUpdate = 'UPDATE Cliente SET  Nombre = ?, Apellido = ?, Direccion = ?, Telefono = ?, Correo = ? WHERE id = ?';
    connection.query(queryUpdate, [Nombre, Apellido, Direccion, Telefono, Correo, Cedula], (error, results) => {
        if (error) {
            console.error('Error al actualizar el cliente:', error);
            return res.status(500).json({ error: 'Error al actualizar el cliente' });
        }
        if (results.affectedRows === 0) {
            // Si no se encontró ningún registro para actualizar
            return res.status(404).json({ error: 'El cliente no existe.' });
        }
        res.status(200).json({ message: 'Cliente actualizado correctamente' });
    });
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
