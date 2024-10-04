// HTML References
let todoElement  = document.getElementById("todo-column")
let doingElement = document.getElementById("doing-column")
let doneElement  = document.getElementById("done-column")

let modPopup       = document.getElementById("modification-popup")
let editTitleInput = document.getElementById("title-input")
let editDescInput  = document.getElementById("description-input")
let editButton     = document.getElementById("modification-button")
let editTitleText  = document.getElementById("modification-title")
let cancelButton   = document.getElementById("cancel-button")

// Global state
let tasks = [
    [{ id: 20, title: "Comprar ous 20", description: "anar al mercadona i comprar ous XL", marked: "black" },{ id: 50, title: "Comprar ous 50", description: "anar al mercadona i comprar ous XL", marked: "black" }, { id: 70, title: "Comprar ous 70", description: "anar al mercadona i comprar ous XL", marked: "red" }],
    [{ id: 53, title: "Comprar pomes", description: "pomespomespomespomes", marked: "black" },{id: 0, title: "0", description: "nah", marked: "black"}],
    [{ id: 63, title: "Netejar cuina (lejía)", description: "cuinacuinacuinacuinacuinacuina", marked: "black" }]
]

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
    render()
    toggleModifyPopup(false, 'edit')
}

function newTask(columnId) {
    let columnToAdd = tasks[columnId]
    // Create new task data (id)
    let allId = []
    for (let i = 0; i < tasks[0].length; i++) {
        allId.push(tasks[0][i].id)
    }
    for (let i = 0; i < tasks[1].length; i++) {
        allId.push(tasks[1][i].id)
    }
    for (let i = 0; i < tasks[2].length; i++) {
        allId.push(tasks[2][i].id)
    }
    //console.log(allId)
    let newId = 0
    let u = 0
    let x = 0
    while (u == 0) {
        if (allId.includes(x) == false) {
            newId = x
            // console.log(newId)
            columnToAdd.push({id: newId, title: "La teva tasca", description: "Descripció", marked: "unmarked"})
            u = 1
            // console.log(columnToAdd)
        }
        x++
    }
    render()
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
        // console.log("comparing " + taskId + " with " + tasks[columnId][i]);
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
}
// TODO - Update function to drag behaviour ^^^^^^

function deleteTask(taskId) {
    for (let i = 0; i < tasks.length; i++) {
        for (let j = 0; j < tasks[i].length; j++) {
            if (tasks[i][j].id == taskId)
                tasks[i].splice(j, 1)
        }
    }
    render()
}
//#endregion

//#region DOM HTML functions
// Updates task columns HTML, should be called every time "tasks" is modified
function render() {
    // Clear columns
    // FIXME - Buttons get deleted because all elements with "persistent" class should avoid being deleted, not just the first one
    let todoAddButton = document.getElementsByClassName("task-plus")[0].outerHTML
    let doingAddButton = document.getElementsByClassName("task-plus")[1].outerHTML
    let doneAddButton = document.getElementsByClassName("task-plus")[2].outerHTML
    // console.log(document.getElementsByClassName("task-plus")[0]);
    todoElement.innerHTML = todoElement.getElementsByClassName("persistent")[0].outerHTML
    doingElement.innerHTML = doingElement.getElementsByClassName("persistent")[0].outerHTML
    doneElement.innerHTML = doneElement.getElementsByClassName("persistent")[0].outerHTML

    // Add a task card HTML element for every task in "tasks" array
    tasks[0].forEach(task => {
        // todoElement.innerHTML += `
        //     <div id=${task.id} style="background-color: beige; display: flex; flex-direction: horizontal; margin: .5rem; padding: 1rem; justify-content: center;">
        //         <button style="width: 100%" onClick="moveTask(this, -1)">⬅️</button>
        //         <h1 style="margin: .5rem;">${task.id}</h1>
        //         <button style="width: 100%" onClick="moveTask(this, 1)">➡️</button>
        //     </div>`
        todoElement.innerHTML += `
            <div id=${task.id} class="taskbox ${ task.marked!="unmarked" ? task.marked : ''}">
                <button onclick="accordionToggleVisible(this)" class="accordion active">${task.title}</button>
                <div class="panel" style="display: none;">
                    <p>${task.description}</p>
                    <div class="btn-container">
                        <button class="btn" onClick="moveTask(this, -1)">⏪</button>
                        <button class="btn">⬆️</button>
                        <button class="btn" onClick="toggleModifyPopup(this.parentElement.parentElement.parentElement, 'edit')">
                            ✏️
                        </button>
                        <button class="btn" onClick="deleteTask(${task.id})">❌</button>
                        <button class="btn" onClick="moveTask(this, 1)">⏩</button>
                    </div>
                </div>
            </div>`
    });
    todoElement.innerHTML += todoAddButton

    tasks[1].forEach(task => {
        doingElement.innerHTML += `
            <div id=${task.id} class="taskbox ${ task.marked!="unmarked" ? task.marked : ''}">
                <button onclick="accordionToggleVisible(this)" class="accordion active">${task.title}</button>
                <div class="panel" style="display: none;">
                    <p>${task.description}</p>
                    <div class="btn-container">
                        <button class="btn" onClick="moveTask(this, -1)">⏪</button>
                        <button class="btn">⬆️</button>
                        <button class="btn" onClick="toggleModifyPopup(this.parentElement.parentElement.parentElement, 'edit')">
                            ✏️
                        </button>
                        <button class="btn" onClick="deleteTask(${task.id})">❌</button>
                        <button class="btn" onClick="moveTask(this, 1)">⏩</button>
                    </div>
                </div>
            </div>`
    });
    doingElement.innerHTML += doingAddButton

    tasks[2].forEach(task => {
        doneElement.innerHTML += `
            <div id=${task.id} class="taskbox ${ task.marked!="unmarked" ? task.marked : ''}">
                <button onclick="accordionToggleVisible(this)" class="accordion active">${task.title}</button>
                <div class="panel" style="display: none;">
                    <p>${task.description}</p>
                    <div class="btn-container">
                        <button class="btn" onClick="moveTask(this, -1)">⏪</button>
                        <button class="btn">⬆️</button>
                        <button class="btn" onClick="toggleModifyPopup(this.parentElement.parentElement.parentElement, 'edit')">
                            ✏️
                        </button>
                        <button class="btn" onClick="deleteTask(${task.id})">❌</button>
                        <button class="btn" onClick="moveTask(this, 1)">⏩</button>
                    </div>
                </div>
            </div>`
    });
    doneElement.innerHTML += doneAddButton
}
render()

// Opens the task data entry popup
// taskElement is the task card div, mode is the modify popup desired action (create/edit) as a string
function toggleModifyPopup(taskElement, mode) {
    if (mode == "create") {
        cancelButton.style.display = "none"
    } else if (mode == "edit") {
        cancelButton.style.display = "block"
    } else {
        console.log("ERROR: Invalid modify popup mode");
        return
    }

    // If we are enabling the popup
    if (modPopup.style.display != "flex") {
        let taskId = taskElement.id
        let task = getTaskById(taskId)

        editTitleInput.value = task.title
        editDescInput.value  = task.description

        modPopup.style.display = "flex"
        editButton.onclick = () => modifyTask({
            id: parseInt(taskId),
            title: editTitleInput.value,
            description: editDescInput.value
        })
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
const overlay = document.querySelector('.overlay');hamburgerContainer.addEventListener('click', () => {
  hamburgerContainer.classList.toggle('open'); // Añade o quita la clase 'open' al contenedor
  menu.classList.toggle('open'); // Abre o cierra el menú al hacer clic
  overlay.classList.toggle('open'); // Muestra u oculta el fondo
});// Cierra el menú y el fondo al hacer clic en el fondo
overlay.addEventListener('click', () => {
  hamburgerContainer.classList.remove('open');
  menu.classList.remove('open');
  overlay.classList.remove('open');
});

//funció per moure elements al top d'una columna
function sortTask(taskId){
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < tasks[i].length; j++) {
            //console.log()
            if(tasks[i][j].id==taskId){
                tasks[i].unshift(tasks[i][j])
                tasks[i].splice(j+1, 1)
            }
        }      
    }
    render()
}

//funció per marcar tasques de color vermell
function markTask(taskId,color){
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < tasks[i].length; j++){
            if(tasks[i][j].id==taskId){
                tasks[i][j].marked = color
                //console.log("primer " + tasks[i][j].id)
            }
        }
    }
    render()
}
//sortTask(70)
// markTask(53, "red")
// markTask(70, "green")
// markTask(63, "yellow")
// markTask(20, "white")
// markTask(50, "blue")