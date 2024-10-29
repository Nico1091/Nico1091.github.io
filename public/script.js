const jsonUrl = '/data'; // URL del archivo JSON
let jsonData = []; // Variable para almacenar los datos JSON

// Función para mostrar los datos en el contenedor
function displayData(data) {
    const dataContainer = document.getElementById('data');
    dataContainer.innerHTML = ''; // Limpiar los datos anteriores

    data.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('card'); 
        itemDiv.innerHTML = `
            
               <img src="${item.imgSrc}" alt="Foto del Docente">
        <h2>${item.Column3}</h2>
        <p class="especialidad"><strong>Departamento Académico:</strong> ${item.Column5}</p>
        <p class="descripcion"><strong>Competencias Transversales:</strong> ${item.Column12}</p>
        <p class="descripcion"><strong>Nivel de Formación:</strong> ${item.Column8}</p>
        <p class="descripcion"><strong>Años de experiencia:</strong> ${item.Column9}</p>
        `;
        dataContainer.appendChild(itemDiv);
    });
}

// Cargar y almacenar los datos JSON
fetch(jsonUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta de la red');
        }
        return response.json();
    })
    .then(data => {
        console.log('Datos JSON recibidos:', data); // Mostrar datos en consola para verificación
        jsonData = data; // Guardar los datos JSON en la variable
        displayData(jsonData); // Mostrar todos los datos inicialmente
    })
    .catch(error => console.error('Error al cargar el JSON:', error));

// Evento para filtrar datos según la entrada del usuario en tiempo real
document.getElementById('searchBar').addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredData = jsonData.filter(item => {
        // Verificar que los campos existen antes de usar toLowerCase
        const nombre = item.Column3 ? item.Column3.toLowerCase() : "";
        const descripcion = item.Column5 ? item.Column5.toLowerCase() : "";
        const competencias = item.Column8 ? item.Column8.toLowerCase() : "";
        
        return nombre.includes(searchTerm) || descripcion.includes(searchTerm) || competencias.includes(searchTerm);
    });
    displayData(filteredData);
});
