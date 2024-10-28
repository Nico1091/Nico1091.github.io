function mostrarFormulario(tipo) {
    document.getElementById("inicio").style.display = "none";

    if (tipo === "empleador") {
        document.getElementById("datos_empleador").style.display = "block";
        document.getElementById("buscador_empleados").style.display = "block";
    } else if (tipo === "empleado") {
        document.getElementById("datos_empleado").style.display = "block";
       
    }
}

function guardarInformacion() {
    let nombre = document.querySelector("#nombre").value;
    let correoElectronico = document.querySelector("#correo_electronico").value;
    let telefono = document.querySelector("#telefono").value;

    console.log("Nombre:", nombre);
    console.log("Correo Electrónico:", correoElectronico);
    console.log("Teléfono:", telefono);
    
    let archivo = document.querySelector("#archivo").files[0];
    if (archivo) {
        let lector = new FileReader();
        lector.onload = function (evento) {
            console.log("Contenido del archivo:", evento.target.result);

            // Enviar la información al servidor
            enviarDatos(nombre, correoElectronico, telefono);
        };
        lector.readAsText(archivo);
    } else {
        console.log("No se ha seleccionado ningún archivo.");
        enviarDatos(nombre, correoElectronico, telefono);
    }
}

function enviarDatos(nombre, correoElectronico, telefono) {
    fetch('http://localhost:3000/guardar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, correoElectronico, telefono }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la conexión con el servidor');
        }
        return response.json();
    })
    .then(data => {
        console.log('Respuesta del servidor:', data);
    })
    .catch(error => {
        console.error('Error al enviar datos:', error);
    });
}

let empleados = [];

function buscarEmpleado() {
    let nombreBuscado = document.getElementById('buscar_nombre').value;
    let resultado = empleados.find(empleado => empleado.nombre.toLowerCase() === nombreBuscado.toLowerCase());

    let resultadoDiv = document.getElementById('resultado_busqueda');
    resultadoDiv.innerHTML = resultado
        ? `<p>Nombre: ${resultado.nombre}<br>Correo: ${resultado.correo}<br>Teléfono: ${resultado.telefono}</p>`
        : `<p>Empleado no encontrado</p>`;
}
