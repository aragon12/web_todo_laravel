let globalTodoData = [];
let deleteTodoId = null;
let showCompleteTodo = false;
let isCompleteTodoExist = false;
const storageKey = "todoData";

const init = () => {
    const data = localStorage.getItem(storageKey);
    if (data == undefined) {
        return;
    }
    globalTodoData = JSON.parse(data);
    renderTasksFromTodoList();
    console.log('hello', globalTodoData);
}

const addTask = () => {
    const field = document.getElementById('taskTfield');
    const fieldValue = (field.value ?? '').trim();
    if (fieldValue == "") {
        return;
    }
    if (globalTodoData.some(i => i.text == fieldValue)) {
        return;
    }
    console.log('addTask', field.value);

    addTaskOnStorage(fieldValue);

    field.value = "";
}

const addTaskOnStorage = (text) => {
    const singleTodo = {
        'text': text,
        'status': 'pending'
    };
    globalTodoData.push(singleTodo);
    addNewTaskRow(createNewTaskRow(globalTodoData.length, singleTodo));
    syncTodoStorage();
}

const syncTodoStorage = () => {
    localStorage.setItem(storageKey, JSON.stringify(globalTodoData));
}

const renderTasksFromTodoList = () => {
    const tBody = document.getElementById('taskTableTbody');
    tBody.innerHTML = "";
    isCompleteTodoExist = false;
    globalTodoData.map((singleTodo, i) => {
        if (singleTodo.status == "completed") {
            isCompleteTodoExist = true;
            if (!showCompleteTodo) {
                return;
            }
        }
        addNewTaskRow(createNewTaskRow(i + 1, singleTodo));
    });

    const toggle = document.getElementById('taskToggleBtn');
    if (isCompleteTodoExist) {
        toggle.style.display = "block";
    } else {
        toggle.style.display = "none";
    }
}

const addNewTaskRow = (rowNode) => {
    const tBody = document.getElementById('taskTableTbody');
    tBody.appendChild(rowNode);
}

const createNewTaskRow = (id, singleTodo) => {
    const row = document.createElement("tr");
    row.setAttribute("id", `taskRow-${id}`);
    row.innerHTML = `<td>${id}</td><td style="max-width: 700px;word-wrap: break-word;">${singleTodo.text}</td>`;
    row.innerHTML += `<td>${singleTodo.status}</td><td>${createRowActions(id, singleTodo)}</td>`;
    return row;
}

const createRowActions = (id, singleTodo) => {
    let htmlString = ``;
    if (singleTodo.status == "pending") {
        htmlString += `<button style="margin-right: 8px" type="button" onclick="markTodoComplete(${id})" class="btn btn-success">`;
        htmlString += `<img src="images/check.svg"/></button>`;
    }
    htmlString += `<button onclick="setDeleteTodo(${id})" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">`;
    htmlString += `<img src="images/cross.svg"/></button>`;
    return htmlString;
}

const markTodoComplete = (id) => {
    globalTodoData[id - 1]['status'] = "completed";
    renderTasksFromTodoList();
    syncTodoStorage();
}

const setDeleteTodo = (id) => {
    deleteTodoId = id - 1;
    const deleteTodo = globalTodoData[deleteTodoId];
    const body = document.getElementById('deleteModalBody');
    body.innerHTML = `Do you want to delete "${deleteTodo.text}"?`;
}

const deleteTodo = () => {
    globalTodoData.splice(deleteTodoId, 1);
    console.log(globalTodoData);
    renderTasksFromTodoList();
    syncTodoStorage();
}

const toggleAllTasks = () => {
    showCompleteTodo = !showCompleteTodo;
    const toggle = document.getElementById('taskToggleBtn');
    toggle.innerHTML = showCompleteTodo ? "Hide completed tasks" : "Show all tasks";
    renderTasksFromTodoList();
}

