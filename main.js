// HTML References
/*
let todoElement = document.getElementById("todo-column")
let doingElement = document.getElementById("doing-column")
let doneElement = document.getElementById("done-column")
*/
// Global state
let todoTask = [32]
let doingTask = [12]
let doneTask = [71]

// Moves task to the previous or next column
function MoveTask(taskId, columnId, direction) {
    // Find the task element and remove it
    tasks[columnId] = tasks[columnId].filter(task => task !== taskId) // TODO - Check if this inequality also works with objects instead of integers
    // Add it to the next column
    tasks[(columnId + direction)%2].push(taskId)
    // Update UI
    Render()
}
NewTask(todoTask)
// Helper functions
function NewTask(taskType) {
    let newId = 0
    let u = 0
    let i = 32
    while (u == 0) {
        if(taskType.includes(i) == false){
            newId = i
            taskType.push(newId)
            u = 1
        }
        i++
    }
    console.log(todoTask)
    /*let newId = conjId[conjId.length-1]
    taskType[i].id
    const novaTasca = new Object();
    for (let i = 0; i < tasks.length; i++) {
        if (i != tasks[i]) {
            novaTasca.id = i++;
        }
    }
    novaTasca.id = Math.floor(Math.random() * 100)
    */
}
