const newTaskBtn=document.querySelector(".btn-task");
const todo=document.querySelector("#to-do");
const progress=document.querySelector("#inprogress")
const done=document.querySelector("#done")
const mod=document.querySelector(".modal")
const taskInput = document.querySelector(".task-container input");
const taskTextarea = document.querySelector(".task-container textarea");
const addTaskBtn = document.querySelector(".task-container button");

let draggedTask = null;

// LocalStorage functions
function saveTasks() {
    const tasks = {
        todo: [],
        progress: [],
        done: []
    };
    
    // Save todo tasks
    todo.querySelectorAll(".task").forEach(task => {
        const title = task.querySelector("h3").textContent;
        const description = task.querySelector("p").textContent;
        tasks.todo.push({title, description});
    });
    
    // Save progress tasks
    progress.querySelectorAll(".task").forEach(task => {
        const title = task.querySelector("h3").textContent;
        const description = task.querySelector("p").textContent;
        tasks.progress.push({title, description});
    });
    
    // Save done tasks
    done.querySelectorAll(".task").forEach(task => {
        const title = task.querySelector("h3").textContent;
        const description = task.querySelector("p").textContent;
        tasks.done.push({title, description});
    });
    
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem("kanbanTasks");
    if(savedTasks) {
        const tasks = JSON.parse(savedTasks);
        
        // Load todo tasks
        tasks.todo.forEach(task => {
            createTaskElement(task.title, task.description, todo);
        });
        
        // Load progress tasks
        tasks.progress.forEach(task => {
            createTaskElement(task.title, task.description, progress);
        });
        
        // Load done tasks
        tasks.done.forEach(task => {
            createTaskElement(task.title, task.description, done);
        });
    }
}

function createTaskElement(title, description, section) {
    const newTask = document.createElement("div");
    newTask.className = "task";
    newTask.draggable = true;
    newTask.innerHTML = `
        <div>
            <h3>${title}</h3>
            <p>${description}</p>
        </div>
        <button class="btn">Delete</button>
    `;
    
    section.appendChild(newTask);
    makeTaskDraggable(newTask);
    
    const deleteBtn = newTask.querySelector(".btn");
    deleteBtn.addEventListener("click", (e)=>{
        e.target.closest(".task").remove();
        updateCounts();
        saveTasks();
    });
}

// Function to make a task draggable
function makeTaskDraggable(task) {
    task.addEventListener("dragstart",(e)=>{
        draggedTask = task;
        e.dataTransfer.effectAllowed = "move";
    })
    
    task.addEventListener("dragend",(e)=>{
        draggedTask = null;
    })
}

// Function to update task counts in all sections
function updateCounts() {
    const todoTasks = todo.querySelectorAll(".task").length;
    const progressTasks = progress.querySelectorAll(".task").length;
    const doneTasks = done.querySelectorAll(".task").length;
    
    todo.querySelector(".right").textContent = todoTasks;
    progress.querySelector(".right").textContent = progressTasks;
    done.querySelector(".right").textContent = doneTasks;
}

progress.addEventListener("dragenter",(e)=>{
    progress.classList.add("hover-over");
})

progress.addEventListener("dragleave",(e)=>{
    progress.classList.remove("hover-over");
})

progress.addEventListener("dragover",(e)=>{
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
})

progress.addEventListener("drop",(e)=>{
    e.preventDefault();
    if(draggedTask) {
        progress.appendChild(draggedTask);
        progress.classList.remove("hover-over");
        updateCounts();
        saveTasks();
    }
})

todo.addEventListener("dragenter",(e)=>{
    todo.classList.add("hover-over");
})

todo.addEventListener("dragleave",(e)=>{
    todo.classList.remove("hover-over");
})

todo.addEventListener("dragover",(e)=>{
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
})

todo.addEventListener("drop",(e)=>{
    e.preventDefault();
    if(draggedTask) {
        todo.appendChild(draggedTask);
        todo.classList.remove("hover-over");
        updateCounts();
        saveTasks();
    }
})

done.addEventListener("dragenter",(e)=>{
    done.classList.add("hover-over");
})

done.addEventListener("dragleave",(e)=>{
    done.classList.remove("hover-over");
})

done.addEventListener("dragover",(e)=>{
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
})

done.addEventListener("drop",(e)=>{
    e.preventDefault();
    if(draggedTask) {
        done.appendChild(draggedTask);
        done.classList.remove("hover-over");
        updateCounts();
        saveTasks();
    }
})
// Initialize existing HTML tasks
function initializeExistingTasks() {
    document.querySelectorAll(".task").forEach(task => {
        makeTaskDraggable(task);
        const deleteBtn = task.querySelector(".btn");
        if(deleteBtn && !deleteBtn.hasListener) {
            deleteBtn.hasListener = true;
            deleteBtn.addEventListener("click", (e)=>{
                e.target.closest(".task").remove();
                updateCounts();
                saveTasks();
            });
        }
    });
}

newTaskBtn.addEventListener("click",()=>{
    mod.style.display="flex";
})

newTaskBtn.addEventListener("dblclick", () => {
    mod.style.display = "none";
});

addTaskBtn.addEventListener("click",()=>{
    const title = taskInput.value.trim();
    const description = taskTextarea.value.trim();
    
    if(title === "" || description === "") {
        alert("Please fill in both title and description");
        return;
    }
    
    // Create task element using the helper function
    createTaskElement(title, description, todo);
    
    // Clear inputs and close modal
    taskInput.value = "";
    taskTextarea.value = "";
    mod.style.display = "none";
    
    // Update counts
    updateCounts();
    
    // Save to localStorage
    saveTasks();
})

// Initialize counts on page load
updateCounts();

// Load tasks from localStorage on page load
loadTasks();

// Initialize existing tasks (both HTML and loaded)
initializeExistingTasks();

// Update counts after initialization
updateCounts();


