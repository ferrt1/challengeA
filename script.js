document.addEventListener("DOMContentLoaded", () => {
    iniciarNivel(1);
});

const niveles = {
    1: {
        titulo: "Nivel 1: Estructuras de Control",
        items: [
            { id: "if-item", texto: "If", categoria: "condicional" },
            { id: "else-item", texto: "Else", categoria: "condicional" },
            { id: "switch-item", texto: "Switch", categoria: "condicional" },
            { id: "ternario-item", texto: "Operador Ternario", categoria: "condicional" },
            { id: "for-item", texto: "for", categoria: "bucle" },
            { id: "while-item", texto: "while", categoria: "bucle" },
            { id: "do-while-item", texto: "do-while", categoria: "bucle" },
            { id: "foreach-item", texto: "foreach", categoria: "bucle" }
        ],
        boxes: [
            { id: "condicional", texto: "Condicionales" },
            { id: "bucle", texto: "Bucles" }
        ]
    },
    2: {
        titulo: "Nivel 2: Tipos de Datos",
        items: [
            { id: "int-item", texto: "Enteros (int)", categoria: "primitivo" },
            { id: "float-item", texto: "Punto flotante (float, double)", categoria: "primitivo" },
            { id: "boolean-item", texto: "Booleanos (true/false)", categoria: "primitivo" },
            { id: "char-item", texto: "Caracteres (char)", categoria: "primitivo" },
            { id: "string-item", texto: "Cadenas de texto (string)", categoria: "primitivo" },
            { id: "array-item", texto: "Arreglos (Array)", categoria: "complejo" },
            { id: "objeto-item", texto: "Objetos (Object)", categoria: "complejo" },
            { id: "list-item", texto: "Listas (List)", categoria: "complejo" }
        ],
        boxes: [
            { id: "primitivo", texto: "Primitivos (Números, Cadenas, Booleanos)" },
            { id: "complejo", texto: "Complejos (Arrays, Objetos)" }
        ]
    },
    3: {
        titulo: "Nivel 3: Paradigmas de Programación",
        items: [
            { id: "objeto-item", texto: "Objetos", categoria: "poo" },
            { id: "clase-item", texto: "Clases", categoria: "poo" },
            { id: "herencia-item", texto: "Herencia", categoria: "poo" },
            { id: "polimorfismo-item", texto: "Polimorfismo", categoria: "poo" },
            { id: "orden-superior-item", texto: "Funciones de Orden Superior", categoria: "funcional" },
            { id: "funciones-puras-item", texto: "Funciones Puras", categoria: "funcional" },
            { id: "estado-mutable-item", texto: "Estado Mutable", categoria: "imperativa" },
            { id: "estructuras-control-item", texto: "Estructuras de Control", categoria: "imperativa" }
        ],
        boxes: [
            { id: "poo", texto: "Programación Orientada a Objetos (POO)" },
            { id: "funcional", texto: "Programación Funcional" },
            { id: "imperativa", texto: "Programación Imperativa" }
        ]
    },
    4: {
        titulo: "Nivel 4: Errores y Depuración",
        items: [
            { id: "falta-puntocoma-item", texto: "Falta de punto y coma", categoria: "sintaxis" },
            { id: "parentesis-item", texto: "Olvidar cerrar un paréntesis", categoria: "sintaxis" },
            { id: "variable-nodefinida-item", texto: "Variable no definida", categoria: "logico" },
            { id: "bucle-infinito-item", texto: "Bucle Infinito", categoria: "logico" },
            { id: "unit-test-item", texto: "Pruebas Unitarias", categoria: "pruebas" },
            { id: "aserciones-item", texto: "Aserciones", categoria: "pruebas" }
        ],
        boxes: [
            { id: "sintaxis", texto: "Errores de Sintaxis" },
            { id: "logico", texto: "Errores Lógicos" },
            { id: "pruebas", texto: "Pruebas Unitarias" }
        ]
    }
};

let nivelActual = 1;
let cantidadErrores = 0;

function iniciarNivel(nivel) {
    nivelActual = nivel;
    let data = niveles[nivel];

    document.getElementById("nivel-titulo").innerText = data.titulo;
    let itemsContainer = document.getElementById("items-container");
    let boxContainer = document.getElementById("box-container");
    
    cantidadErrores = 0;
    document.getElementById("error-message").innerText = ""; 

    itemsContainer.innerHTML = "";
    boxContainer.innerHTML = "";
    
    if(nivelActual === 1){
        document.getElementById("back-level").classList.add("hidden");
    }

    data.items.sort(() => Math.random() - 0.5);
    
    data.items.forEach(item => {
        let div = document.createElement("div");
        div.classList.add("item");
        div.id = item.id;
        div.innerText = item.texto;
        div.setAttribute("draggable", "true");
        itemsContainer.appendChild(div);

        div.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text", e.target.id);
        });
    });

    data.boxes.forEach(box => {
        let wrapper = document.createElement("div");
        wrapper.classList.add("box-wrapper");

        let titulo = document.createElement("h3");
        titulo.classList.add("box-title");
        titulo.innerText = box.texto;
        wrapper.appendChild(titulo);

        let div = document.createElement("div");
        div.classList.add("box");
        div.id = box.id;
        wrapper.appendChild(div);

        boxContainer.appendChild(wrapper);

        div.addEventListener("dragover", (e) => e.preventDefault());

        div.addEventListener("drop", (e) => {
            e.preventDefault();
            let id = e.dataTransfer.getData("text");
            let draggedElement = document.getElementById(id);

            let categoria = data.items.find(item => item.id === id)?.categoria;
            if (categoria === box.id) {
                div.appendChild(draggedElement);
                draggedElement.style.background = "lightgreen";
                draggedElement.setAttribute("draggable", "false");
                verificarNivelCompletado();
            } else {
                alert("Incorrecto, intenta de nuevo");
                cantidadErrores++; 
                document.getElementById("error-message").innerText = `Errores: ${cantidadErrores}`; 
            }
        });
    });
    document.getElementById("next-level").classList.add("hidden");
}

function verificarNivelCompletado() {
    let totalItems = document.querySelectorAll(".item").length;
    let itemsClasificados = document.querySelectorAll(".box .item").length;

    if (itemsClasificados === totalItems) {
        document.getElementById("next-level").classList.remove("hidden");
        if(nivelActual > 1){
            document.getElementById("back-level").classList.remove("hidden");
        }
    }
}

document.getElementById("back-level").addEventListener("click", () => {
    let nivelAnterior = nivelActual - 1;
    if (niveles[nivelAnterior]) {
        iniciarNivel(nivelAnterior);
    } 
});


document.getElementById("next-level").addEventListener("click", () => {
    let siguienteNivel = nivelActual + 1;
    if (niveles[siguienteNivel]) {
        iniciarNivel(siguienteNivel);
    } else {
        alert("¡Felicidades! Has completado todos los niveles.");
    }
});
