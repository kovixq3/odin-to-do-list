import { createTask } from "./domAddTask.js";
import projectFactory from "./projectFactory.js";
import { storeProject } from "./storage.js";
export { createAddProjectBtn, createProject }

function addProject() {
    document.querySelector('.add-project--btn').remove()

    const parentCtner = document.querySelector('.add-project-ctner')
    const input = document.createElement('input')
    input.setAttribute('type', 'text')

    const ctner = document.createElement('div')
    ctner.classList.add('item')

    const submit = document.createElement('div')
    const cancel = document.createElement('div')

    submit.classList.add('submit')
    cancel.classList.add('cancel')
    submit.textContent = 'O'
    cancel.textContent = 'X'

    submit.addEventListener('click', submittingProject)
    cancel.addEventListener('click', cancelAddingProject)

    ctner.appendChild(input)
    ctner.appendChild(submit)
    ctner.appendChild(cancel)

    parentCtner.appendChild(ctner)


    function cancelAddingProject() {
        ctner.remove()
        parentCtner.appendChild(createAddProjectBtn())
    }

    function submittingProject() {
        if (input.value) {
            const projectsCtner = document.querySelector('.projects-ctner')
            const newProject = projectFactory(input.value)
            projectsCtner.appendChild(createProject(newProject))
        }
        cancelAddingProject()
    }
}

function createAddProjectBtn() {
    const addProjectBtn = document.createElement('div');
    addProjectBtn.classList.add('add-project--btn');
    addProjectBtn.addEventListener('click', addProject);

    const addProjectBtnText = document.createElement('div');
    addProjectBtnText.textContent = 'Add Project';
    addProjectBtn.appendChild(addProjectBtnText);

    return addProjectBtn;
}

function createProject(newProject) {
    if (!localStorage.getItem(newProject.title)) storeProject(newProject)


    const domItem = document.createElement('div');
    domItem.classList.add('item');
    domItem.textContent = newProject.title;

    domItem.addEventListener('click', (e) => {
        addSelectedClass(e.target)
        updateTaskSectionDisplay(e.target)
    })

    // update selected-project__tasks-ctner

    function addSelectedClass(i) {
        const projectsCtner = document.querySelector('.projects-ctner')
        const childrenArr = [...projectsCtner.children]
        childrenArr.forEach(e => e.classList.remove('selected'));
        i.classList.add('selected')
    }

    function updateTaskSectionDisplay(i) {
        // loop through local storage looking for a specific project name (i.textContent)
        // const arr = JSON.parse(localStorage.getItem(i.textContent))
        // arr.forEach(e => createTask(e, true))

        const selectedProjectTitle = document.querySelector('.selected-project__title')
        selectedProjectTitle.textContent = i.textContent

        const selectedProjectTasksCtner = document.querySelector('.selected-project__tasks-ctner')

    }

    return domItem;
}