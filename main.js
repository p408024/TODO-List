// HTML References
let todoElement = document.getElementById("todo-column")
let doingElement = document.getElementById("doing-column")
let doneElement = document.getElementById("done-column")

// Global state
let tasks = [[32, 55],
             [12],
             [71]]

// Moves task to the previous or next column
function MoveTask(taskId, columnId, direction) {
    // Find the task element and remove it
    // tasks[columnId] = tasks[columnId].filter(task => task != taskId) // TODO - Check if this inequality also works with objects instead of integers
    tasks[columnId].splice(tasks[columnId].indexOf(taskId), 1)
    // Add it to the next column
    let newColumnId = Math.min(Math.max(columnId + direction, 0), 2)
    tasks[newColumnId].push(taskId)
    // Update UI
    Render()
}

// Helper functions
function NewTask(taskType) {
    let newId = 0
    let u = 0
    let i = 0
    while (u == 0) {
        if(taskType.includes(i) == false){
            newId = i
            taskType.push(newId)
            u = 1
        }
        i++
    }
    // console.log(todoTask)

    Render()
}
// NewTask(todoTask)
             
// Updates task columns HTML, should be called every time "tasks" is modified
function Render() {
    // Clear columns
    todoElement.innerHTML  = ""
    doingElement.innerHTML = ""
    doneElement.innerHTML  = ""

    // Add a task card HTML element for every task in "tasks" array
    tasks[0].forEach(task => {
        todoElement.innerHTML += `
            <div style="background-color: beige; display: flex; flex-direction: horizontal; margin: .5rem; padding: 1rem; justify-content: center;">
                <button style="width: 100%">⬅️</button>
                <h1 style="margin: .5rem;">${task}</h1>
                <button style="width: 100%">➡️</button>
            </div>`
    });

    tasks[1].forEach(task => {
        doingElement.innerHTML += `
            <div style="background-color: beige; display: flex; flex-direction: horizontal; margin: .5rem; padding: 1rem; justify-content: center;">
                <button style="width: 100%">⬅️</button>
                <h1 style="margin: .5rem;">${task}</h1>
                <button style="width: 100%">➡️</button>
            </div>`
    });

    tasks[2].forEach(task => {
        doneElement.innerHTML += `
            <div style="background-color: beige; display: flex; flex-direction: horizontal; margin: .5rem; padding: 1rem; justify-content: center;">
                <button style="width: 100%">⬅️</button>
                <h1 style="margin: .5rem;">${task}</h1>
                <button style="width: 100%">➡️</button>
            </div>`
    });
}
Render()
             
             var acc = document.getElementsByClassName("accordion");
             var i;
             
             for (i = 0; i < acc.length; i++) {
               acc[i].addEventListener("click", function() {
                 this.classList.toggle("active");
                 var panel = this.nextElementSibling;
                 if (panel.style.display === "block") {
                   panel.style.display = "none";
                 } else {
                   panel.style.display = "block";
                 }
               });
             }