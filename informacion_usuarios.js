function guardarInformacion() {
    let nombre = document.querySelector("#nombre").value;
    let correoElectronico = document.querySelector("#correo_electronico").value;
    let telefono = document.querySelector("#telefono").value; // Ajustado el ID aquí
    console.log("Nombre:", nombre);
    console.log("Correo Electrónico:", correoElectronico);
    console.log("Teléfono:", telefono);
    
    let archivo = document.querySelector("#archivo").files[0];
    if (archivo) {
        let lector = new FileReader();
        lector.onload = function (evento) {
            // Aquí puedes procesar el contenido del archivo
            console.log("Contenido del archivo:", evento.target.result);
            console.log("Nombre:", nombre);
        };
        lector.readAsText(archivo); // Lee el archivo como texto
    } else {
        console.log("No se ha seleccionado ningún archivo.");
    }
}
