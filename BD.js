const axios = require('axios');

const API_URL = 'https://www.googletagmanager.com/gtag/js?id=G-7SFQ1E8YEY';
const API_KEY = 'TU_API_KEY'; // Reemplaza con tu API Key

// Ejemplo de una función para obtener datos de una tabla específica
async function obtenerDatosDeTabla(tabla) {
    try {
        const response = await axios.get(`${API_URL}/${tabla}/rows.json`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('Datos obtenidos:', response.data);
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
}

// Llamada a la función con el nombre de la tabla que quieras consultar
obtenerDatosDeTabla('Datos_Clientes');
