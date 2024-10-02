// HTML References
let todoElement = document.getElementById("todo-column")
let doingElement = document.getElementById("doing-column")
let doneElement = document.getElementById("done-column")

// Global state
let tasks = [
    [{ id: 20, title: "Comprar ous", description: "anar al mercadona i comprar ous XL" }],
    [{ id: 53, title: "Comprar pomes", description: "pomespomespomespomes"}],
    [{ id: 63, title: "Netejar cuina (lejía)", description: "cuinacuinacuinacuinacuinacuina" }]
]

//#region TASK FUNCTIONS
// Moves task to the previous or next column
function moveTask(el, direction) {
    // Find task and column ids
    let taskId = el.parentElement.id
    let columnId = 0
    switch (el.parentElement.parentElement.id) {
        case "todo-column":  columnId = 0; break;
        case "doing-column": columnId = 1; break;
        case "done-column":  columnId = 2; break;
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
    if(taskToMove == {}) return

    // Add it to the next column
    let newColumnId = Math.min(Math.max(columnId + direction, 0), 2)
    tasks[newColumnId].push(taskToMove)

    // Update UI
    render()
}

function newTask(columnId) {
    let columnToAdd = tasks[columnId]

    // Create new task data (id)
    let newId = 0
    let u = 0
    let i = 0
    while (u == 0) {
        if(tasks[0].includes(i) == false && tasks[1].includes(i) == false && tasks[2].includes(i) == false){
            newId = i
            columnToAdd.push(newId)
            u = 1
        }
        i++
    }

    render()
}

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
             
// Updates task columns HTML, should be called every time "tasks" is modified
function render() {
    // Clear columns
    todoElement.innerHTML  = todoElement.getElementsByClassName("column-title")[0].outerHTML
    doingElement.innerHTML = doingElement.getElementsByClassName("column-title")[0].outerHTML
    doneElement.innerHTML  = doneElement.getElementsByClassName("column-title")[0].outerHTML

    // Add a task card HTML element for every task in "tasks" array
    tasks[0].forEach(task => {
        todoElement.innerHTML += `
            <div id=${task.id} style="background-color: beige; display: flex; flex-direction: horizontal; margin: .5rem; padding: 1rem; justify-content: center;">
                <button style="width: 100%" onClick="moveTask(this, -1)">⬅️</button>
                <h1 style="margin: .5rem;">${task.id}</h1>
                <button style="width: 100%" onClick="moveTask(this, 1)">➡️</button>
            </div>`
    });

    tasks[1].forEach(task => {
        doingElement.innerHTML += `
            <div id=${task.id} style="background-color: beige; display: flex; flex-direction: horizontal; margin: .5rem; padding: 1rem; justify-content: center;">
                <button style="width: 100%" onclick="moveTask(this, -1)">⬅️</button>
                <h1 style="margin: .5rem;">${task.id}</h1>
                <button style="width: 100%" onclick="moveTask(this, 1)">➡️</button>
            </div>`
    });

    tasks[2].forEach(task => {
        doneElement.innerHTML += `
            <div id=${task.id} style="background-color: beige; display: flex; flex-direction: horizontal; margin: .5rem; padding: 1rem; justify-content: center;">
                <button style="width: 100%" onclick="moveTask(this, -1)">⬅️</button>
                <h1 style="margin: .5rem;">${task.id}</h1>
                <button style="width: 100%" onclick="moveTask(this, 1)">➡️</button>
            </div>`
    });
}
render()
             
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
