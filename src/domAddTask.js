import taskFactory from "./taskFactory";
import { formatDistanceToNow } from 'date-fns'
export { createAddTaskBtn }

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
        const newTask = taskFactory(title.value, date.valueAsDate)
        createTask(newTask.title, formatDistanceToNow(newTask.dueDate, {addSuffix: true}))
        cancelAddingTask()
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

function createTask(title, date) {
    const task = document.createElement('div');
    task.classList.add('selected-project__task')
    const taskCheck = document.createElement('input')
    const taskTitle = document.createElement('div')
    const taskDate = document.createElement('div')
    taskCheck.classList.add('task--checkbox')
    taskCheck.setAttribute('type', 'checkbox')
    taskTitle.classList.add('task--title')
    taskTitle.textContent = title
    taskDate.classList.add('task--date')
    taskDate.textContent = date

    task.appendChild(taskCheck)
    task.appendChild(taskTitle)
    task.appendChild(taskDate)

    const ctner = document.querySelector('.selected-project__tasks-ctner')
    ctner.appendChild(task)
}