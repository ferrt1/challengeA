document.addEventListener("DOMContentLoaded", () => {
    iniciarNivel(1);
});

const niveles = {
    1: {
        titulo: "Nivel 1: Estructuras de Control",
        items: [
            { id: "if-item", texto: "If", categoria: "conditional" },
            { id: "else-item", texto: "Else", categoria: "conditional" },
            { id: "switch-item", texto: "Switch", categoria: "conditional" },
            { id: "for-item", texto: "for", categoria: "loop" },
            { id: "while-item", texto: "while", categoria: "loop" },
            { id: "do-while-item", texto: "do-while", categoria: "loop" }
        ],
        boxes: [
            { id: "conditional", texto: "Condicionales" },
            { id: "loop", texto: "Bucles" }
        ]
    },
    2: {
        titulo: "Nivel 2: Tipos de Datos",
        items: [
            { id: "int-item", texto: "int", categoria: "numerico" },
            { id: "float-item", texto: "float", categoria: "numerico" },
            { id: "string-item", texto: "string", categoria: "texto" },
            { id: "char-item", texto: "char", categoria: "texto" }
        ],
        boxes: [
            { id: "numerico", texto: "Numéricos" },
            { id: "texto", texto: "Texto" }
        ]
    }
};

let nivelActual = 1;

function iniciarNivel(nivel) {
    nivelActual = nivel;
    let data = niveles[nivel];

    document.getElementById("nivel-titulo").innerText = data.titulo;
    let itemsContainer = document.getElementById("items-container");
    let boxContainer = document.getElementById("box-container");

    itemsContainer.innerHTML = "";
    boxContainer.innerHTML = "";

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
        document.getElementById("back-level").classList.remove("hidden");
    }
}

document.getElementById("next-level").addEventListener("click", () => {
    let siguienteNivel = nivelActual + 1;
    if (niveles[siguienteNivel]) {
        iniciarNivel(siguienteNivel);
    } else {
        alert("¡Felicidades! Has completado todos los niveles.");
    }
});
