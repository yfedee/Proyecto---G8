document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('inicio').style.display = 'block';
    document.getElementById('productos').style.display = 'none';
    document.getElementById('contacto').style.display = 'none';
    document.getElementById('servicios').style.display = 'none';
});
    
    document.getElementById('enlaceInicio').addEventListener('click', function () {
        document.getElementById('inicio').style.display = 'block';
        document.getElementById('productos').style.display = 'none';
        document.getElementById('contacto').style.display = 'none';
        document.getElementById('servicios').style.display = 'none'; 
    });

    document.getElementById('enlaceProductos').addEventListener('click', function () {
        document.getElementById('productos').style.display = 'block';
        document.getElementById('inicio').style.display = 'none';
        document.getElementById('contacto').style.display = 'none';
        document.getElementById('servicios').style.display = 'none';
    });

    document.getElementById('enlaceServicios').addEventListener('click', function () {
        document.getElementById('servicios').style.display = 'block';
        document.getElementById('inicio').style.display = 'none';
        document.getElementById('productos').style.display = 'none';
        document.getElementById('contacto').style.display = 'none';
    });

    document.getElementById('enlaceContacto').addEventListener('click', function () {
        document.getElementById('contacto').style.display = 'flex';
        document.getElementById('inicio').style.display = 'none';
        document.getElementById('productos').style.display = 'none';
        document.getElementById('servicios').style.display = 'none';
    });

    function verImagenCompleta(imagen) {
        let productos = document.querySelectorAll('#subseccionProductos article');
        let indexActual = -1;

        for (let index = 0; index < productos.length; index++) {
            const element = productos[index];
            const img = element.querySelector('img');
            if (img.src.endsWith(imagen)){
                indexActual = index;
                break;
            }
        }  
        let titulo = productos[indexActual].querySelector('h2').textContent;
        let descripcion = productos[indexActual].querySelector('p').textContent;

        let contenedor = document.createElement('div');
        contenedor.className = 'imagen-completa';
    
        let img = document.createElement('img');
        img.src = `assets/productos/${imagen}`;
        img.alt = titulo;
    
        let infoContainer = document.createElement('div');
        infoContainer.className = 'info-container';
    
        let tituloElement = document.createElement('h2');
        tituloElement.textContent = titulo;
    
        let descripcionElement = document.createElement('p');
        descripcionElement.textContent = descripcion;
    
        let cerrarBoton = document.createElement('span');
        cerrarBoton.className = 'cerrar-imagen';
        cerrarBoton.innerHTML = '&times;';
    
        infoContainer.appendChild(img);
        infoContainer.appendChild(tituloElement);
        infoContainer.appendChild(descripcionElement);
    
        contenedor.appendChild(infoContainer);
        contenedor.appendChild(cerrarBoton);
    
        document.body.appendChild(contenedor);
    
        contenedor.style.display = 'flex';
    
        cerrarBoton.addEventListener('click', function () {
            document.body.removeChild(contenedor);
        });
    
        let flechaIzquierda = document.createElement('span');
        flechaIzquierda.className = 'flecha-izquierda';
        flechaIzquierda.innerHTML = '<';
    
        let flechaDerecha = document.createElement('span');
        flechaDerecha.className = 'flecha-derecha';
        flechaDerecha.innerHTML = '>';
    
        contenedor.appendChild(flechaIzquierda);
        contenedor.appendChild(flechaDerecha);
    
       
    
        flechaIzquierda.addEventListener('click', function () {
            indexActual = (indexActual - 1 + productos.length) % productos.length;
            img.src = productos[indexActual].querySelector('img').src;
            tituloElement.textContent = productos[indexActual].querySelector('h2').textContent;
            descripcionElement.textContent = productos[indexActual].querySelector('p').textContent;
        });
    
        flechaDerecha.addEventListener('click', function () {
            indexActual = (indexActual + 1) % productos.length;
            img.src = productos[indexActual].querySelector('img').src;
            tituloElement.textContent = productos[indexActual].querySelector('h2').textContent;
            descripcionElement.textContent = productos[indexActual].querySelector('p').textContent;
        });
    }
    


    // Variables globales para manejar los pasos del formulario
    let currentStep = 1;
    let totalSteps = 7; // Ajustar según la cantidad de pasos en el formulario

    // Función para mostrar el formulario paso a paso
    function mostrarFormularioPasoAPaso() {
        document.getElementById('paso1').style.display = 'block';
        document.getElementById('formulario-proceso').style.display = 'none';
        currentStep = 1;
    }

    // Función para avanzar al siguiente paso
    function siguientePaso() {
        if (currentStep < totalSteps) {
            document.getElementById('paso' + currentStep).style.display = 'none';
            currentStep++;
            document.getElementById('paso' + currentStep).style.display = 'block';
        }
    }

    // Función para retroceder al paso anterior
    function anteriorPaso() {
        if (currentStep > 1) {
            document.getElementById('paso' + currentStep).style.display = 'none';
            currentStep--;
            document.getElementById('paso' + currentStep).style.display = 'block';
        }
    }

// Función para enviar el formulario
async function enviarFormularioContacto() {
    // Lógica para enviar el formulario

    // Muestra la ventana emergente con los datos del usuario
    let confirmacionUsuario = await mostrarConfirmacion();

    if (confirmacionUsuario) {
        // Si el usuario elige modificar, muestra solo el paso 1
        document.getElementById('paso1').style.display = 'block';
        for (let i = 2; i <= totalSteps; i++) {
            document.getElementById('paso' + i).style.display = 'none';
        }
        currentStep = 1;
    } else {
        // Solicitud AJAX con un retardo de 2 segundos
        setTimeout(() => {
            // Después de enviar el formulario, puedes ocultar la sección del formulario y mostrar un mensaje de éxito
            document.getElementById('contacto').style.display = 'none';
            alert("¡Formulario enviado con éxito! Pronto recibirás una respuesta.");
            // Recarga la página después de la alerta
            window.location.reload();
        }, 1500);
    }
}

// Función para mostrar una confirmación personalizada en la ventana emergente
function mostrarConfirmacion() {
    // Obtener datos del formulario
    let nombre = document.getElementById('nombre').value;
    let email = document.getElementById('email').value;
    let telefono = document.getElementById('Telefono').value;
    let fechaEvento = document.getElementById('fechaEvento').value;
    let tipoEvento = document.getElementById('tipoEvento').value;
    let numInvitados = document.getElementById('numInvitados').value;
    let mensaje = document.getElementById('mensaje').value;

    // Crear mensaje de confirmación con los datos del usuario
    let mensajeConfirmacion =
        `Nombre: ${nombre}\n` +
        `Email: ${email}\n` +
        `Teléfono: ${telefono}\n` +
        `Fecha del Evento: ${fechaEvento}\n` +
        `Tipo de Evento: ${tipoEvento}\n` +
        `Número de Invitados: ${numInvitados}\n` +
        `Mensaje: ${mensaje}\n`;

    // Cuadro de diálogo asíncrono para mostrar la confirmación con los datos hasta el momento
    let respuesta = confirm(mensajeConfirmacion + "\n\nPor favor verifique que los datos sean correctos. ¿Enviar?");
    
    return respuesta;
}

// Array con las palabras que cambiarán
    let palabrasCambiantes = ['diferentes', 'divertidas', 'relajadas', 'con onda'];
    let indexPalabra = 0;

    // Función para cambiar la palabra
    function cambiarPalabra() {
        document.getElementById('textoCambiante').textContent = palabrasCambiantes[indexPalabra];
        indexPalabra = (indexPalabra + 1) % palabrasCambiantes.length;
    }

    // Llamada inicial para mostrar la primera palabra
    cambiarPalabra();

    // Llama a la función cambiarPalabra cada 2 segundos
    setInterval(cambiarPalabra, 2500);
