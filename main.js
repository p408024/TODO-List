// HTML References
let todoElement = document.getElementById("todo-column")
let doingElement = document.getElementById("doing-column")
let doneElement = document.getElementById("done-column")

// Global state
let tasks = [
    [{ id: 20, title: "Comprar ous", description: "anar al mercadona i comprar ous XL" }, { id: 70, title: "Comprar ous", description: "anar al mercadona i comprar ous XL" }],
    [{ id: 53, title: "Comprar pomes", description: "pomespomespomespomes" }],
    [{ id: 63, title: "Netejar cuina (lejía)", description: "cuinacuinacuinacuinacuinacuina" }]
]

//#region TASK FUNCTIONS
// Moves task to the previous or next column
function MoveTask(el, direction) {
    // Find task and column ids
    let taskId = el.parentElement.id
    let columnId = 0
    switch (el.parentElement.parentElement.id) {
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
    Render()
}

function NewTask(columnId) {
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
    console.log(allId)
    let newId = 0
    let u = 0
    let x = 52
    while (u == 0) {
        if (allId.includes(x) == false) {
            newId = x
            console.log(newId)
            columnToAdd.push({id: newId, title: "Hola", description: "aloh"})
            u = 1
            console.log(columnToAdd)
        }
        x++
        // if(columnToAdd[0].id == false && columnToAdd[0].id.includes(i) == false && columnToAdd[0].id.includes(i) == false){
        // newId = i
        // columnToAdd.push(newId)
        // console.log(columnToAdd)
        // u = 1
        //}
        //i++
    }

    Render()
}

function deleteTask(taskId) {
    if (tasks[0].includes(taskId) == true) {
        let position = tasks[0].indexOf(taskId)
        tasks[0].splice(position, 1)
    }
    if (tasks[1].includes(taskId) == true) {
        let position = tasks[1].indexOf(taskId)
        tasks[1].splice(position, 1)
    }
    if (tasks[2].includes(taskId) == true) {
        let position = tasks[2].indexOf(taskId)
        tasks[2].splice(position, 1)
    }
    Render()
}
//#endregion

// Updates task columns HTML, should be called every time "tasks" is modified
function Render() {
    // Clear columns
    todoElement.innerHTML = todoElement.getElementsByClassName("column-title")[0].outerHTML
    doingElement.innerHTML = doingElement.getElementsByClassName("column-title")[0].outerHTML
    doneElement.innerHTML = doneElement.getElementsByClassName("column-title")[0].outerHTML

    // Add a task card HTML element for every task in "tasks" array
    tasks[0].forEach(task => {
        todoElement.innerHTML += `
            <div id=${task.id} style="background-color: beige; display: flex; flex-direction: horizontal; margin: .5rem; padding: 1rem; justify-content: center;">
                <button style="width: 100%" onClick="MoveTask(this, -1)">⬅️</button>
                <h1 style="margin: .5rem;">${task.id}</h1>
                <button style="width: 100%" onClick="MoveTask(this, 1)">➡️</button>
            </div>`
    });

    tasks[1].forEach(task => {
        doingElement.innerHTML += `
            <div id=${task.id} style="background-color: beige; display: flex; flex-direction: horizontal; margin: .5rem; padding: 1rem; justify-content: center;">
                <button style="width: 100%" onclick="MoveTask(this, -1)">⬅️</button>
                <h1 style="margin: .5rem;">${task.id}</h1>
                <button style="width: 100%" onclick="MoveTask(this, 1)">➡️</button>
            </div>`
    });

    tasks[2].forEach(task => {
        doneElement.innerHTML += `
            <div id=${task.id} style="background-color: beige; display: flex; flex-direction: horizontal; margin: .5rem; padding: 1rem; justify-content: center;">
                <button style="width: 100%" onclick="MoveTask(this, -1)">⬅️</button>
                <h1 style="margin: .5rem;">${task.id}</h1>
                <button style="width: 100%" onclick="MoveTask(this, 1)">➡️</button>
            </div>`
    });
}
Render()

// Task accordion behaviour
// var acc = document.getElementsByClassName("accordion");
// var i;

// for (i = 0; i < acc.length; i++) {
//     acc[i].addEventListener("click", function() {
//     this.classList.toggle("active");
//     var panel = this.nextElementSibling;
//     if (panel.style.display === "block") {
//         panel.style.display = "none";
//     } else {
//         panel.style.display = "block";
//     }
//     });
// }
