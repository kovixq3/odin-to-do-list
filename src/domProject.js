import projectFactory from "./projectFactory.js";
import { projectStorage } from "./storage.js";
import { updateTaskSectionDisplay } from "./domTask.js";
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
        if (input.value && !localStorage.getItem(input.value)) {
            const projectsCtner = document.querySelector('.projects-ctner')
            const newProject = projectFactory(input.value, 'template description')
            projectsCtner.appendChild(createProject(newProject, false))
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

function createProject(newProject, domOnly) {
    // if this is NOT called for creating dom element only, store project 
    let projectTitle = newProject;
    if (domOnly !== true) {
        projectStorage(newProject)
        projectTitle = newProject.title
    };

    const domItem = document.createElement('div');
    domItem.classList.add('item');
    domItem.textContent = projectTitle;
    domItem.addEventListener('click', (e) => {
        addSelectedClass(e.target)
        updateTaskSectionDisplay(projectTitle)
    })

    function addSelectedClass(n) {
        const projectsCtner = document.querySelector('.projects-ctner')
        const childrenArr = [...projectsCtner.children]
        childrenArr.forEach(e => e.classList.remove('selected'));
        n.classList.add('selected')
    }

    return domItem;
}