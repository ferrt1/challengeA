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
            { id: "for-item", texto: "For", categoria: "bucle" },
            { id: "while-item", texto: "While", categoria: "bucle" },
            { id: "do-while-item", texto: "Do-While", categoria: "bucle" },
            { id: "foreach-item", texto: "ForEach", categoria: "bucle" }
        ],
        boxes: [
            { id: "condicional", texto: "Condicionales" },
            { id: "bucle", texto: "Bucles" }
        ],
        hints: [
            "Los condicionales controlan el flujo de un programa.",
            "El operador ternario es una forma compacta de escribir un 'if'.",
            "Un 'switch' se usa cuando tienes múltiples condiciones relacionadas.",
            "Los bucles se usan para repetir acciones.",
            "El bucle 'for' es útil cuando sabes cuántas veces repetir algo.",
            "El 'while' se usa cuando no sabes cuántas veces repetir algo."
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
            { id: "primitivo", texto: "Primitivos" },
            { id: "complejo", texto: "Complejos" }
        ],
        hints: [
            "Los datos primitivos son los más básicos y no se pueden dividir.",
            "Los enteros se usan para números sin decimales.",
            "Las cadenas de texto son secuencias de caracteres.",
            "Los objetos son estructuras de datos más complejas que pueden contener múltiples tipos de datos.",
            "Las listas pueden almacenar elementos de cualquier tipo, incluyendo otros objetos."
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
            { id: "poo", texto: "Programación Orientada a Objetos" },
            { id: "funcional", texto: "Programación Funcional" },
            { id: "imperativa", texto: "Programación Imperativa" }
        ],
        hints: [
            "Los objetos agrupan datos y comportamientos relacionados.",
            "La herencia permite crear nuevas clases basadas en otras.",
            "El polimorfismo permite que un mismo método se comporte de diferentes maneras.",
            "En la programación funcional, las funciones son los elementos básicos.",
            "Las funciones puras no tienen efectos secundarios y siempre devuelven el mismo resultado para los mismos parámetros.",
            "La programación imperativa se enfoca en cómo se deben hacer las cosas paso a paso."
        ]
    },
    4: {
        titulo: "Nivel 4: Errores y Depuración",
        items: [
            { id: "sintaxis-item", texto: "No cerrar paréntesis", categoria: "sintaxis" },
            { id: "variable-no-declarada-item", texto: "Variable no declarada", categoria: "sintaxis" },
            { id: "infinito-item", texto: "Bucle infinito", categoria: "logico" },
            { id: "null-item", texto: "Acceso a null", categoria: "logico" },
            { id: "test-unitario-item", texto: "Prueba unitaria", categoria: "unitaria" },
            { id: "assert-item", texto: "Asserts", categoria: "unitaria" }
        ],
        boxes: [
            { id: "sintaxis", texto: "Errores de Sintaxis" },
            { id: "logico", texto: "Errores Lógicos" },
            { id: "unitaria", texto: "Pruebas Unitarias" }
        ],
        hints: [
            "Los errores de sintaxis ocurren cuando el código no sigue las reglas del lenguaje.",
            "Los errores lógicos no impiden la ejecución del código pero causan resultados incorrectos.",
            "Las pruebas unitarias permiten verificar que las funciones se comportan como se espera.",
            "Usar asserts ayuda a comprobar que el estado del programa es el esperado en las pruebas."
        ]
    }
};

let nivelActual = 1;
let cantidadErrores = 0;
let pistaIndex = 0;

function iniciarNivel(nivel) {
    nivelActual = nivel;
    let data = niveles[nivel];

    document.getElementById("nivel-titulo").innerText = data.titulo;
    let itemsContainer = document.getElementById("items-container");
    let boxContainer = document.getElementById("box-container");
    
    const hintBox = document.getElementById("hint-box");
    hintBox.classList.remove("show");

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
                draggedElement.style.background = "#b8daba";
                draggedElement.style.border = "1px solid #70b578";
                draggedElement.setAttribute("draggable", "false");
                verificarNivelCompletado();
            } else {
                cantidadErrores++;
                document.getElementById("error-message").innerText = `Errores: ${cantidadErrores}`;
        
                document.body.classList.add("error");
                document.body.classList.add("shake");
                document.getElementById("error-message").style.color = "black";
                setTimeout(() => {
                    document.body.classList.remove("shake");
                    document.body.classList.remove("error");
                    document.getElementById("error-message").style.color = "#d61b1b";

                }, 1000); 
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

document.getElementById("hint-button").addEventListener("click", () => {
    const hintBox = document.getElementById("hint-box");
    const hintText = document.getElementById("hint-text");
    const data = niveles[nivelActual];

    if (data.hints) {
        if (pistaIndex < data.hints.length) {
            hintText.textContent = data.hints[pistaIndex++];
            hintBox.classList.add("show"); 
        } else {
            pistaIndex = 0; 
            hintText.textContent = data.hints[pistaIndex++];
            hintBox.classList.add("show"); 
        }

    }
});

document.getElementById("close-hint").addEventListener("click", () => {
    const hintBox = document.getElementById("hint-box");
    hintBox.classList.remove("show");
});