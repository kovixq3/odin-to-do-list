import taskFactory from "./taskFactory";
import { taskStorage, taskStorageDelete } from "./storage";
import { formatDistanceToNow } from 'date-fns'
export { createAddTaskBtn, updateTaskSectionDisplay }

function addTask() {
    document.querySelector('.add-task--btn').remove()

    const urParent = document.querySelector('.add-task-ctner')
    const ctner = document.createElement('div')
    const title = document.createElement('input')
    const date = document.createElement('input')
    const submit = document.createElement('div')
    const cancel = document.createElement('div')

    ctner.classList.add('selected-project__task')
    title.setAttribute('type', 'text')
    date.setAttribute('type', 'date')

    submit.classList.add('submit')
    cancel.classList.add('cancel')
    submit.textContent = 'Submit'
    cancel.textContent = 'Cancel'

    submit.addEventListener('click', submittingTask)
    cancel.addEventListener('click', cancelAddingTask)

    ctner.appendChild(title)
    ctner.appendChild(date)
    ctner.appendChild(submit)
    ctner.appendChild(cancel)
    urParent.appendChild(ctner)


    function cancelAddingTask() {
        ctner.remove()
        urParent.appendChild(createAddTaskBtn())
    }

    function submittingTask() {
        if (title.value && date.value) {
            const newTask = taskFactory(title.value, date.value);
            createTask(newTask, false);
            cancelAddingTask();
        }
        return
    }
}

function createAddTaskBtn() {
    const addTaskButton = document.createElement('div');
    addTaskButton.classList.add('add-task--btn');
    addTaskButton.addEventListener('click', addTask);

    const addTaskButtonText = document.createElement('div');
    addTaskButtonText.textContent = 'Add Task';
    addTaskButton.appendChild(addTaskButtonText);

    return addTaskButton
}

function createTask(newTask, domOnly) {
    // if this is NOT called for creating dom element only, store task
    if (domOnly !== true) taskStorage(newTask)

    // convert date string to date obj
    newTask.dueDate = new Date(newTask.dueDate)

    const task = document.createElement('div');
    task.classList.add('selected-project__task');
    // click to expand and allows user enter data & delete

    const taskCheck = document.createElement('input');
    taskCheck.classList.add('task--checkbox');
    taskCheck.setAttribute('type', 'checkbox');

    const taskTitle = document.createElement('div');
    taskTitle.classList.add('task--title');
    taskTitle.textContent = newTask.title;

    const taskDate = document.createElement('div');
    taskDate.classList.add('task--date');
    taskDate.textContent = formatDistanceToNow(newTask.dueDate, {addSuffix: true});


    const taskEdit = document.createElement('div');
    taskEdit.classList.add('task--edit');
    taskEdit.textContent = 'Edit'
    taskEdit.addEventListener('click', (e) => editTask(e.target.parentNode))


    task.appendChild(taskCheck);
    task.appendChild(taskTitle);
    task.appendChild(taskDate);
    task.appendChild(taskEdit)

    const ctner = document.querySelector('.selected-project__tasks-ctner');
    ctner.appendChild(task);
}

function editTask(toReplace) {
    const edit = document.createElement('div');
    edit.classList.add('selected-project__task');

    const editTitle = document.createElement('input')
    editTitle.classList.add('task--title')
    editTitle.setAttribute('type', 'text')
    editTitle.value = toReplace.querySelector('.task--title').textContent

    const editDate = document.createElement('input');
    editDate.classList.add('task--date');
    editDate.setAttribute('type', 'date')
    // take date out from LS because i cant think of a better way for now
    const selectedTitle = document.querySelector('.selected').textContent;
    const arr = JSON.parse(localStorage.getItem(selectedTitle)).tasks
    editDate.value = arr[arr.findIndex((e) => e.title === editTitle.value)].dueDate

    const editConfirm = document.createElement('div');
    editConfirm.textContent = 'OK'
    editConfirm.addEventListener('click', confirm)

    const editDelete = document.createElement('div');
    editDelete.textContent = 'Delete'
    editDelete.addEventListener('click', deleteTask)


    edit.appendChild(editTitle)
    edit.appendChild(editDate)
    edit.appendChild(editConfirm)
    edit.appendChild(editDelete)
    
    const ctner = document.querySelector('.selected-project__tasks-ctner')
    ctner.replaceChild(edit, toReplace)


    // now we just gotta take user input, tackle all the things in LS and update display
    function confirm() {
        if (editTitle.value && editDate.value) {
            const toReplaceTitle = toReplace.querySelector('.task--title').textContent;
            taskStorage(taskFactory(editTitle.value, editDate.value), toReplaceTitle);

            const selectedTitle = document.querySelector('.selected').textContent;
            updateTaskSectionDisplay(selectedTitle)
        }
        return
    }

    function deleteTask() {
        const toDeleteTitle = toReplace.querySelector('.task--title').textContent;
        taskStorageDelete(toDeleteTitle)

        const selectedTitle = document.querySelector('.selected').textContent;
        updateTaskSectionDisplay(selectedTitle)
    }
}

function updateTaskSectionDisplay(projectTitle) {
    const selectedProjectTitle = document.querySelector('.selected-project__title')
    selectedProjectTitle.textContent = projectTitle

    const selectedProjectTasksCtner = document.querySelector('.selected-project__tasks-ctner')
    while (selectedProjectTasksCtner.firstChild) {
        selectedProjectTasksCtner.removeChild(selectedProjectTasksCtner.firstChild)
    }

    const arr = JSON.parse(localStorage.getItem(projectTitle)).tasks
    arr.forEach(e => createTask(e, true))
}