const entradaTarea = document.getElementById("entradaTarea");
const btnAgregar = document.getElementById("btnAgregar");
const listaTareas = document.getElementById("listaTareas");
const contador = document.getElementById("contador");
const btnLimpiar = document.getElementById("btnLimpiar");

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

mostrarTareas();

btnAgregar.addEventListener("click", agregarTarea);

entradaTarea.addEventListener("keypress", function(evento) {
    if (evento.key === "Enter") {
        agregarTarea();
    }
});

btnLimpiar.addEventListener("click", limpiarTareas);


function agregarTarea() {
    const texto = entradaTarea.value.trim();

    if (texto === "") {
        alert("Por favor, escribe una tarea.");
        return;
    }

    const nuevaTarea = {
        id: Date.now(),
        texto: texto,
        completada: false
    };

    tareas.push(nuevaTarea);

    guardarTareas();
    entradaTarea.value = "";
    mostrarTareas();
}


function mostrarTareas() {
    listaTareas.innerHTML = "";

    tareas.forEach(function(tarea) {
        const elemento = document.createElement("li");
        elemento.classList.add("tarea");

        if (tarea.completada) {
            elemento.classList.add("completada");
        }

        elemento.innerHTML = `
            <span
                onclick="cambiarEstado(${tarea.id})"
                style="cursor:pointer">
                ${tarea.texto}
            </span>

            <button
                class="btnEliminar"
                onclick="eliminarTarea(${tarea.id})">
                Eliminar
            </button>
        `;

        listaTareas.appendChild(elemento);
    });

    actualizarContador();
}


function cambiarEstado(id) {
    tareas = tareas.map(function(tarea) {
        if (tarea.id === id) {
            tarea.completada = !tarea.completada;
        }

        return tarea;
    });

    guardarTareas();
    mostrarTareas();
}


function eliminarTarea(id) {
    tareas = tareas.filter(function(tarea) {
        return tarea.id !== id;
    });

    guardarTareas();
    mostrarTareas();
}


function limpiarTareas() {
    if (tareas.length === 0) {
        return;
    }

    const confirmar = confirm(
        "¿Deseas eliminar todas las tareas?"
    );

    if (confirmar) {
        tareas = [];
        guardarTareas();
        mostrarTareas();
    }
}


function guardarTareas() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}


function actualizarContador() {
    const pendientes = tareas.filter(function(tarea) {
        return !tarea.completada;
    }).length;

    contador.textContent = pendientes;
}