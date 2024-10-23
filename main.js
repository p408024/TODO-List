// HTML References
let todoElement = document.getElementById("todo-column")
let doingElement = document.getElementById("doing-column")
let doneElement = document.getElementById("done-column")
let modPopup = document.getElementById("modification-popup")
let editTitleInput = document.getElementById("title-input")
let editDescInput = document.getElementById("description-input")
let editButton = document.getElementById("modification-button")
let editTitleText = document.getElementById("modification-title")
let cancelEdit = document.getElementById("cancel-edit")
let cancelCreate = document.getElementById("cancel-create")
let editColorInput = document.getElementById("color-input")

// Global state
let tasks = [[], [], []]

//#region TASK DATA FUNCTIONS
function modifyTask(newTaskData) {
    for (let j = 0; j < tasks.length; j++) {
        for (let i = 0; i < tasks[j].length; i++) {
            if (tasks[j][i].id == newTaskData.id) {
                tasks[j][i] = newTaskData
            }
        }
    }

    // Update
    setTimeout(() => {
        render()
        updateTaskButtons()
        toggleModifyPopup(false, 'edit')
    }, 150);
}

function newTask(columnId) {
    let columnToAdd = tasks[columnId]

    // Create new task data (id)
    let allId = [0]
    for (let i = 0; i < tasks[0].length; i++) {
        allId.push(tasks[0][i].id)
    }
    for (let i = 0; i < tasks[1].length; i++) {
        allId.push(tasks[1][i].id)
    }
    for (let i = 0; i < tasks[2].length; i++) {
        allId.push(tasks[2][i].id)
    }
    let newId = 0
    let u = 0
    let x = 0
    while (u == 0) {
        if (allId.includes(x) == false) {
            newId = x
            columnToAdd.push({ id: newId, title: "", description: "", marked: "unmarked" })
            u = 1
        }
        x++
    }
    render()
    updateTaskButtons()
    toggleModifyPopup(document.getElementById(newId), 'create')
}

// Moves task to the previous or next column, direction is -1 for left and 1 for right
function moveTask(el, direction) {

    // Find task and column ids
    let taskId = el.parentElement.parentElement.parentElement.id
    let columnId = 0
    switch (el.parentElement.parentElement.parentElement.parentElement.id) {
        case "todo-column": columnId = 0; break;
        case "doing-column": columnId = 1; break;
        case "done-column": columnId = 2; break;
    }

    // Find the task element and remove it
    let taskToMove = {}
    for (let i = 0; i < tasks[columnId].length; i++) {
        if (tasks[columnId][i].id == taskId) {
            taskToMove = tasks[columnId][i]
            tasks[columnId].splice(i, 1)
        }
    }
    if (taskToMove == {}) return

    // Add it to the next column
    let newColumnId = Math.min(Math.max(columnId + direction, 0), 2)
    tasks[newColumnId].push(taskToMove)

    // Update UI
    render()
    updateTaskButtons()
}

function deleteTask(taskId) {
    for (let i = 0; i < tasks.length; i++) {
        for (let j = 0; j < tasks[i].length; j++) {
            if (tasks[i][j].id == taskId)
                tasks[i].splice(j, 1)
        }
    }
    if (modPopup.style.display == "flex") {
        modPopup.style.display = "none"
    }
    render()
    updateTaskButtons()
}
//#endregion

//#region DOM HTML functions
// Updates task columns HTML, should be called every time "tasks" is modified
function render(creatingTask) {

    // Clear columns
    let todoAddButton = document.getElementsByClassName("task-plus")[0].outerHTML
    let doingAddButton = document.getElementsByClassName("task-plus")[1].outerHTML
    let doneAddButton = document.getElementsByClassName("task-plus")[2].outerHTML
    let isAccordionOpenList = [{}, {}, {}]
    let _cols = [todoElement, doingElement, doneElement]
    for (let j = 0; j < isAccordionOpenList.length; j++) {
        let columnChildren = _cols[j].children
        for (let i = 0; i < columnChildren.length; i++) {
            if (columnChildren[i].className == "taskbox") {
                isAccordionOpenList[j][columnChildren[i].id] = columnChildren[i].children[0].classList.contains("active")
            }
        }
    }

    todoElement.innerHTML = todoElement.getElementsByClassName("persistent")[0].outerHTML
    doingElement.innerHTML = doingElement.getElementsByClassName("persistent")[0].outerHTML
    doneElement.innerHTML = doneElement.getElementsByClassName("persistent")[0].outerHTML

    // Add a task card HTML element for every task in "tasks" array
    tasks[0].forEach((task, i) => {
        todoElement.innerHTML += `
            <div id=${task.id} class="taskbox ${task.marked != "unmarked" ? task.marked : ''}">
                <button onclick="accordionToggleVisible(this)" class="accordion ${!isAccordionOpenList[0][task.id] || creatingTask ? "" : "active"}">
                    ${task.title}
                </button>
                <div class="panel" style="display: ${!isAccordionOpenList[0][task.id] ? "none" : "flex"}">
                    <p>${task.description}</p>
                    <div class="btn-container">
                        <button class="disabled">⬅️</button>
                        <button class="btn" onClick="toggleModifyPopup(this.parentElement.parentElement.parentElement, 'edit')">✏️</button>
                        <button class="btn" onClick="deleteTask(${task.id})">❌</button>
                        <button class="btn" onClick="moveTask(this, 1)">➡️</button>
                        <button class="btn" onClick="sortTaskUp(this.parentElement.parentElement.parentElement.id)">⏫</button>
                        <button class="btn" onClick="moveTaskUp(this.parentElement.parentElement.parentElement.id)">⬆️</button>
                        <button class="btn" onClick="moveTaskDown(this.parentElement.parentElement.parentElement.id)">⬇️</button>
                        <button class="btn" onClick="sortTaskDown(this.parentElement.parentElement.parentElement.id)">⏬</button>
                    </div>
                </div>
            </div>`
    });
    todoElement.innerHTML += todoAddButton

    tasks[1].forEach((task, i) => {
        doingElement.innerHTML += `
            <div id=${task.id} class="taskbox ${task.marked != "unmarked" ? task.marked : ''}">
                <button onclick="accordionToggleVisible(this)" class="accordion ${!isAccordionOpenList[1][task.id] || creatingTask ? "" : "active"}">
                    ${task.title}
                </button>
                <div class="panel" style="display: ${!isAccordionOpenList[1][task.id] ? "none" : "flex"}">
                    <p>${task.description}</p>
                    <div class="btn-container">
                        <button class="btn" onClick="moveTask(this, -1)">⬅️</button>
                        <button class="btn" onClick="toggleModifyPopup(this.parentElement.parentElement.parentElement, 'edit')">✏️</button>
                        <button class="btn" onClick="deleteTask(${task.id})">❌</button>
                        <button class="btn" onClick="moveTask(this, 1)">➡️</button>
                        <button class="btn" onClick="sortTaskUp(this.parentElement.parentElement.parentElement.id)">⏫</button>
                        <button class="btn" onClick="moveTaskUp(this.parentElement.parentElement.parentElement.id)">⬆️</button>
                        <button class="btn" onClick="moveTaskDown(this.parentElement.parentElement.parentElement.id)">⬇️</button>
                        <button class="btn" onClick="sortTaskDown(this.parentElement.parentElement.parentElement.id)">⏬</button>
                    </div>
                </div>
            </div>`
    });
    doingElement.innerHTML += doingAddButton

    tasks[2].forEach((task, i) => {
        doneElement.innerHTML += `
            <div id=${task.id} class="taskbox ${task.marked != "unmarked" ? task.marked : ''}">
                <button onclick="accordionToggleVisible(this)" class="accordion ${!isAccordionOpenList[2][task.id] || creatingTask ? "" : "active"}">
                    ${task.title}
                </button>
                <div class="panel" style="display: ${!isAccordionOpenList[2][task.id] ? "none" : "flex"}">
                    <p>${task.description}</p>
                    <div class="btn-container">
                        <button class="btn" onClick="moveTask(this, -1)">⬅️</button>
                        <button class="btn" onClick="toggleModifyPopup(this.parentElement.parentElement.parentElement, 'edit')">✏️</button>
                        <button class="btn" onClick="deleteTask(${task.id})">❌</button>
                        <button class="disabled">➡️</button>
                        <button class="btn" onClick="sortTaskUp(this.parentElement.parentElement.parentElement.id)">⏫</button>
                        <button class="btn" onClick="moveTaskUp(this.parentElement.parentElement.parentElement.id)">⬆️</button>
                        <button class="btn" onClick="moveTaskDown(this.parentElement.parentElement.parentElement.id)">⬇️</button>
                        <button class="btn" onClick="sortTaskDown(this.parentElement.parentElement.parentElement.id)">⏬</button>
                    </div>
                </div>
            </div>`
    });
    doneElement.innerHTML += doneAddButton
}

render()
updateTaskButtons()

function updateTaskButtons() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < tasks[i].length; j++) {
            const taskId = tasks[i][j].id;
            const taskElement = document.getElementById(taskId);

            // Botones para mover arriba y abajo
            const moveUpBtn = taskElement.querySelector('button[onClick*="moveTaskUp"]');
            const moveDownBtn = taskElement.querySelector('button[onClick*="moveTaskDown"]');
            const move2UpBtn = taskElement.querySelector('button[onClick*="sortTaskUp"]');
            const move2DownBtn = taskElement.querySelector('button[onClick*="sortTaskDown"]');

            // Si la tarea está en la primera posición, desactivar el botón de mover arriba
            if (j === 0) {
                moveUpBtn.classList.add("disabled");
                moveUpBtn.classList.remove("btn");
                move2UpBtn.classList.add("disabled");
                move2UpBtn.classList.remove("btn");
            }
            else {
                moveUpBtn.classList.remove("disabled");
                moveUpBtn.classList.add("btn");
                move2UpBtn.classList.remove("disabled");
                move2UpBtn.classList.add("btn");
            }

            // Si la tarea está en la última posición, desactivar el botón de mover abajo
            if (j === tasks[i].length - 1) {
                moveDownBtn.classList.add("disabled");
                moveDownBtn.classList.remove("btn");
                move2DownBtn.classList.add("disabled");
                move2DownBtn.classList.remove("btn");
            } else {
                moveDownBtn.classList.remove("disabled");
                moveDownBtn.classList.add("btn");
                move2DownBtn.classList.remove("disabled");
                move2DownBtn.classList.add("btn");
            }
        }
    }
}

// Opens the task data entry popup
// taskElement is the task card div, mode is the modify popup desired action (create/edit) as a string
function toggleModifyPopup(taskElement, mode) {
    if (mode == "create") {
        cancelEdit.style.display = "none"
        cancelCreate.innerHTML = `<div id="cancel-create" onclick="deleteTask(${taskElement.id})">Cancel</div>`
        cancelCreate.style.display = "block"
        editTitleText.innerText = "New Task"
    } else if (mode == "edit") {
        cancelEdit.style.display = "block"
        cancelCreate.style.display = "none"
        editTitleText.innerText = "Edit Task"
    } else {
        console.log("ERROR: Invalid modify popup mode");
        return
    }

    // If we are enabling the popup
    if (modPopup.style.display != "flex") {
        let taskId = taskElement.id
        let task = getTaskById(taskId)

        editTitleInput.value = task.title
        editDescInput.value = task.description
        editColorInput.value = task.marked

        modPopup.style.display = "flex"
        editButton.onclick = () => {

            //check if title is empty
            if (editTitleInput.value.replaceAll(" ", "") == "") {
                window.alert("Please Insert Title")
            } else {
                let u = 0
                for (let i = 0; i < tasks[0].length; i++) {
                    if (tasks[0][i].title == editTitleInput.value && tasks[0][i].marked == editColorInput.value) {
                        u++
                    }
                }
                for (let i = 0; i < tasks[1].length; i++) {
                    if (tasks[1][i].title == editTitleInput.value && tasks[1][i].marked == editColorInput.value) {
                        u++
                    }
                }
                for (let i = 0; i < tasks[2].length; i++) {
                    if (tasks[2][i].title == editTitleInput.value && tasks[2][i].marked == editColorInput.value) {
                        u++
                    }
                }
                if (u > 0) {
                    window.alert("There cannot be two tasks with identical title AND color")
                } else {
                    modifyTask({
                        id: parseInt(taskId),
                        title: editTitleInput.value,
                        description: editDescInput.value,
                        marked: editColorInput.value
                    })
                }
            }
        }

    } else {
        modPopup.style.display = "none"
    }
}

function accordionToggleVisible(element) {
    element.classList.toggle("active");
    let panel = element.nextElementSibling;
    if (panel.style.display === "flex") {
        panel.style.display = "none";
    } else {
        panel.style.display = "flex";
    }
}

//#endregion
// Helper functions
function getTaskById(taskId) {
    for (let j = 0; j < tasks.length; j++) {
        for (let i = 0; i < tasks[j].length; i++) {
            if (tasks[j][i].id == taskId) {
                return tasks[j][i]
            }
        }
    }
}

const hamburgerContainer = document.querySelector('.hamburger-container');
const menu = document.querySelector('.menu');
const overlay = document.querySelector('.overlay'); hamburgerContainer.addEventListener('click', () => {

    // Añade o quita la clase 'open' al contenedor
    hamburgerContainer.classList.toggle('open');

    // Abre o cierra el menú al hacer clic
    menu.classList.toggle('open');

    // Muestra u oculta el fondo
    overlay.classList.toggle('open');
});

overlay.addEventListener('click', () => {
    hamburgerContainer.classList.remove('open');
    menu.classList.remove('open');
    overlay.classList.remove('open');
});

//funció per moure elements al top d'una columna
function sortTaskUp(taskId) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < tasks[i].length; j++) {
            if (tasks[i][j].id == taskId) {
                tasks[i].unshift(tasks[i][j])
                tasks[i].splice(j + 1, 1)
            }
        }
    }
    render()
    updateTaskButtons()
}

function sortTaskDown(taskId) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < tasks[i].length; j++) {
            if (tasks[i][j].id == taskId) {

                // Guardar la tarea que será movida
                let task = tasks[i][j];

                // Eliminar la tarea de su posición actual
                tasks[i].splice(j, 1);

                // Añadir la tarea al final del array
                tasks[i].push(task);

                // Romper el bucle ya que el elemento ha sido encontrado
                break;
            }
        }
    }
    render()
    updateTaskButtons()
}

function moveTaskUp(taskId) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < tasks[i].length; j++) {
            if (tasks[i][j].id == taskId) {

                // Verificar que no esté en la primera posición
                if (j > 0) {

                    // Intercambiar la tarea con la tarea anterior
                    let temp = tasks[i][j - 1];
                    tasks[i][j - 1] = tasks[i][j];
                    tasks[i][j] = temp;
                }

                // Romper el bucle una vez que la tarea ha sido movida
                break;
            }
        }
    }
    render()
    updateTaskButtons()
}

function moveTaskDown(taskId) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < tasks[i].length; j++) {
            if (tasks[i][j].id == taskId) {

                // Verificar que no esté en la última posición
                if (j < tasks[i].length - 1) {

                    // Intercambiar la tarea con la tarea siguiente
                    let temp = tasks[i][j + 1];
                    tasks[i][j + 1] = tasks[i][j];
                    tasks[i][j] = temp;
                }

                // Romper el bucle una vez que la tarea ha sido movida
                break;
            }
        }
    }
    render()
    updateTaskButtons()
}

//funció per marcar tasques de color vermell
function markTask(taskId, color) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < tasks[i].length; j++) {
            if (tasks[i][j].id == taskId) {
                tasks[i][j].marked = color
            }
        }
    }
    render()
    updateTaskButtons()
}

var limitTitle = 80;
var limitDesc = 500;

// Ejecutar cuando la página se haya cargado
document.addEventListener("DOMContentLoaded", function () {
    // Título
    var titleInput = document.getElementById("title-input");
    var titleCounter = document.getElementById("contadorTitle");
    titleCounter.innerHTML = "Max. length: 80 characters";

    titleInput.addEventListener("input", function () {
        // Obtener la longitud actual del valor del input
        var init = titleInput.value.length;

        // Calcular los caracteres restantes
        var total_characters = limitTitle - init;

        // Actualizar el contador con los caracteres restantes
        titleCounter.innerHTML = "Max. length: " + total_characters + " characters";
    });

    // Descripción
    var descInput = document.getElementById("description-input");
    var descCounter = document.getElementById("contadorDesc");
    descCounter.innerHTML = "Max. length: " + limitDesc + " characters";

    descInput.addEventListener("input", function () {
        // Obtener la longitud actual del valor del input
        var init = descInput.value.length;

        // Calcular los caracteres restantes
        var total_characters = limitDesc - init;

        // Actualizar el contador con los caracteres restantes
        descCounter.innerHTML = "Max. length: " + total_characters + " characters";
    });

    render();
    updateTaskButtons();
});