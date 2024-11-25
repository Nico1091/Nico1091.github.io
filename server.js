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


app.get('/Transacciones',(req,res)=>{
    connection.query('SELECT * FROM Transaccion',(err,results)=>{
        if(err){
            res.status(500).send('Error al obtener los datos de Transaccion');
            return
        }
        if(results.length === 0){
            res.status(404).send('No existen Transacciones');
        }
        res.json(results);
    });
});


app.get('/sucursal', (req, res) => {
    connection.query('SELECT * FROM Sucursal', (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener datos sucursal.');
            return
        }
        if (results.length === 0) {
            res.status(404).send('No se encontraron datos de sucursal');
        }
        res.json(results);
    });
});

app.get('/Cuenta', (req, res) => {
    connection.query('SELECT * FROM Cuenta', (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener datos de cuenta.');
            return
        }
        if (results.length === 0) {
            res.status(404).send('No se encontraron datos de cuenta');
        }
        res.json(results);
    });
});

app.delete('Departamento/eliminar', (req, res) => {
    const { id } = req.body;
    const borrarquery = 'DELETE FROM Departamento WHERE Id=?';
    if (!id) {
        return res.status(400).json({ error: 'Id de Departamento no proporcionado' });
    }
    connection.query(borrarquery, [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar Departamento' });
        }
        if (results.affectedRows === 0) {
            return res.status(500).json({ error: 'Departamento no encontrado' })
        }
        res.json({ message: 'Departamento eliminado exitosamente' });
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


app.delete('/departamento/eliminar', (req, res) => {
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
            return res.status(404).json({ error: 'Departamento no encontrado.' });
        }

        res.json({ message: 'Departamento eliminado exitosamente' });
    });
});

app.delete('/cuenta/eliminar', (req, res) => {
    const { id } = req.body;
    const borrarquery = 'DELETE FROM Cuenta WHERE Id = ?';

    if (!id) {
        return res.status(400).json({ error: 'Id de Cuenta no proporcionado' });
    }
    connection.query(borrarquery, [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar Cuenta' });
        }
        if (results.affectedRows == 0) {
            return res.status(404).json({ error: 'Cuenta no encontrada' });
        }
        res.json({ message: 'Cuenta eliminada exitosamente' });
    });
});

app.put('/actualizarCliente', (req, res) => {
    const { Cedula, Nombre, Apellido, Direccion, Telefono, Correo } = req.body;

    console.log('Cédula recibida para actualización:', Cedula);

    // Consulta de actualización directa, verifica si se encuentra y actualiza
    const queryUpdate = 'UPDATE Cliente SET Nombre = ?, Apellido = ?, Direccion = ?, Telefono = ?, Correo = ? WHERE Cedula = ?';
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

app.put('/actualizarSucursal', (req, res) => {
    const { Nombre, Direccion, Ciudad, Codigo_postal, Telefono } = req.body;

    console.log('Sucursal recibido para actualización:', Nombre);

    // Consulta de actualización directa, verifica si se encuentra y actualiza
    const queryUpdate = 'UPDATE Sucursal SET Nombre = ?, Direccion = ?,Ciudad = ?,Codigo_postal = ? WHERE Telefono=?';
    connection.query(queryUpdate, [Nombre, Direccion, Ciudad, Codigo_postal, Telefono], (error, results) => {
        if (error) {
            console.error('Error al actualizar la sucursal:', error);
            return res.status(500).json({ error: 'Error al actualizar la sucursal' });
        }
        if (results.affectedRows === 0) {
            // Si no se encontró ningún registro para actualizar
            return res.status(404).json({ error: 'La sucursal no existe.' });
        }
        res.status(200).json({ message: 'Sucursal actualizada correctamente' });
    });
});

app.put('/actualizarCuenta',(req,res) => {
    const {TipoCuentaC, nuevoSaldoC, nuevaFechaApertura, nuevoClienteC, nuevaSucursalC, Numero_Cuenta}=req.body;

    console.log('Cuenta recibida para actualizacion: ', Numero_Cuenta);
 
    const queryUpdate = 'UPDATE Cuenta SET Tipo_Cuenta = ?, Saldo = ?, Fecha_Apertura = ?, Cliente_Id = ?, Sucursal_Id = ? WHERE Numero_Cuenta  = ?';
    connection.query(queryUpdate, [TipoCuentaC,nuevoSaldoC,nuevaFechaApertura,nuevoClienteC,nuevaSucursalC,Numero_Cuenta], (error, results)  => {
        if(error) {
            console.error('Error al actualizar la cuenta',error);
            return res.status(500).json({error: 'Error al actualizar la cuenta'});
        }
        if(results.affectedRows === 0){
            return res.status(404).json({error: 'La cuenta no existe.' });
        }
        res.status(200).json({messasge: 'Cuenta actualizada correctamente'});
    }); 
});

app.put('/actualizarDepartamento', (req, res) => {
    const { Descripcion, Nombre } = req.body;

    console.log('Departamento recibido para actualización:', Nombre);
    const queryUpdate = 'UPDATE Departamento SET Descripcion = ? WHERE Nombre = ?';
    connection.query(queryUpdate, [Descripcion, Nombre], (error, results) => {
        if (error) {
            console.error('Error al actualizar Departamento', error)
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'El departamento no existe.' });
        }
        res.status(200).json({ message: 'Departamento actualizado correctamente' })
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


// Endpoint para agregar una nueva sucursal
app.post('/Cuenta/agregar', (req, res) => {
    const { Numero_Cuenta, Tipo_Cuenta, Saldo, Cliente_Id_Cuenta, Sucursal_Id_Cuenta } = req.body;
    // Consulta para verificar si ya existe un cliente con la misma cédula
    const verificarCuentaQuery = 'SELECT * FROM Cuenta WHERE Numero_Cuenta = ?';
    connection.query(verificarCuentaQuery, [Numero_Cuenta], (err, results) => {
        if (err) {
            console.error('Error al verificar Cuenta:', err.message);
            res.status(500).send('Error en la red al verificar la Cuenta');
            return;
        }
        if (results.length > 0) {
            console.log('La Cuenta ya esta registrado duply')
            res.status(409).json({ message: 'ya está registrada una cuenta con este Numero' });
        } else {
            // Si no existe, agregamos el cliente
            const agregarCuentaQuery = 'INSERT INTO Cuenta ( Numero_Cuenta, Tipo_Cuenta, Saldo, Cliente_Id, Sucursal_Id) VALUES (?, ?, ?, ?, ?)';

            connection.query(agregarCuentaQuery, [Numero_Cuenta, Tipo_Cuenta, Saldo, Cliente_Id_Cuenta, Sucursal_Id_Cuenta], (err, results) => {
                if (err) {
                    console.error('Error al agregar la Cuenta:', err.message);
                    res.status(500).send('Error en la red al agregar la Cuenta');
                } else {
                    res.status(200).json({ message: 'Cuenta agregada exitosamente' });
                }
            });
        }
    });
});

app.post('/Departamento/agregar', (req, res) => {
    const { Nombre, Descripcion } = req.body;
    // Consulta para verificar si ya existe un cliente con la misma cédula
    const verificarDepartamentoQuery = 'SELECT * FROM Departamento WHERE Nombre = ?';
    connection.query(verificarDepartamentoQuery, [Nombre], (err, results) => {
        if (err) {
            console.error('Error al verificar Departamento:', err.message);
            res.status(500).send('Error en la red al verificar el Departamento');
            return;
        }
        if (results.length > 0) {
            console.log('El departamento ya esta registrado duply')
            res.status(409).json({ message: 'ya está registrado un departammento con este Nombre' });
        } else {
            // Si no existe, agregamos el cliente
            const agregarDepartamentoQuery = 'INSERT INTO Departamento (Nombre,Descripcion) VALUES (?, ?)';

            connection.query(agregarDepartamentoQuery, [Nombre, Descripcion], (err, results) => {
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

app.post('/Transaccion/agregar', (req, res) => {
    const { Id,Tipo_Transaccion, Monto, Cliente_id,Cuenta_Destino_Id} = req.body;
    // Consulta para verificar si ya existe un cliente con la misma cédula
    const verificarTransferenciaQuery = 'SELECT * FROM Transaccion WHERE Cuenta_Destino_Id=?';
    connection.query(verificarTransferenciaQuery, [Id], (err, results) => {
        if (err) {
            console.error('Error al verificar Transaccion:', err.message);
            res.status(500).send('Error en la red al verificar la Transaccion');
            return;
        }
        if (results.length > 0) {
            console.log('La Transaccion ya esta registrado duply')
            res.status(409).json({ message: 'ya está registrada una Transaccion con este Id' });
        } else {
            // Si no existe, agregamos el cliente
            const agregarTransaccionQuery = 'INSERT INTO Transaccion (Tipo_Transaccion, Monto, Cliente_id,Cuenta_Destino_Id) VALUES (?,?,?,?)';

            connection.query(agregarTransaccionQuery, [Tipo_Transaccion, Monto, Cliente_id,Cuenta_Destino_Id], (err, results) => {
                if (err) {
                    console.error('Error al agregar la Transaccion:', err.message);
                    res.status(500).send('Error en la red al agregar la Transaccion');
                } else {
                    res.status(200).json({ message: 'Transaccion agregada exitosamente' });
                }
            });
        }
    });
});


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

    const query = 'SELECT Nombre,Direccion,Ciudad,Codigo_postal, Telefono FROM Sucursal WHERE Id = ?';
    connection.query(query, [idSucursal], (err, results) => { // Usa `connection` en lugar de `db`
        if (err) {
            console.error('Error al obtener datos de la Sucursal:', err);
            return res.json({ error: 'Error al obtener datos de la Sucursal' });
        }

        if (results.length === 0) {
            return res.json({ error: 'Sucursal no encontrado' });
        }

        res.json(results[0]);
    });
});

app.get('/obtenerCuenta', (req, res) => {
    const idCuenta = req.query.id;

    if (!idCuenta) {
        return res.json({ error: 'Id de Cuenta no proporcionado ' });
    }

    const query = 'SELECT Numero_Cuenta,Tipo_Cuenta,Saldo,Fecha_Apertura,Cliente_Id,Sucursal_Id FROM Cuenta Where Id = ?';
    connection.query(query, [idCuenta], (err, results) => {
        if (err) {
            console.error('Error al obtener los datos de Cuenta', err);
            return res.json({ error: 'Error al obtener datos de Cuenta'});
        }
        if (results.length === 0) {
            return res.json({ error: 'Cuenta no encontrada' });
        }
        res.json(results[0]);
    });
});

app.get('/obtenerDepartamento', (req, res) => {
    const idDepartamento = req.query.id;

    if (!idDepartamento) {
        return res.json({ error: 'Id de Departamento no proporcionado' });
    }

    const query = 'SELECT Nombre, Descripcion  FROM Departamento WHERE Id = ?';
    connection.query(query, [idDepartamento], (err, results) => { // Usa `connection` en lugar de `db`
        if (err) {
            console.error('Error al obtener datos de departamento:', err);
            return res.json({ error: 'Error al obtener datos de Departamento' });
        }

        if (results.length === 0) {
            return res.json({ error: 'Departamento no encontrado' });
        }

        res.json(results[0]);
    });
});




// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});