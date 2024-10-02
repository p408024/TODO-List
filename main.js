// HTML References
let todoElement  = document.getElementById("todo-column")
let doingElement = document.getElementById("doing-column")
let doneElement  = document.getElementById("done-column")

// Global state
let tasks = [[32],
             [12],
             [71]]
             
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