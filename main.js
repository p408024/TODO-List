// HTML References
let todoElement  = document.getElementById("todo-column")
let doingElement = document.getElementById("doing-column")
let doneElement  = document.getElementById("done-column")

// Global state
let tasks = [[32, 55],
             [12],
             [71]]
             
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