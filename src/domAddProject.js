import projectFactory from "./projectFactory";
export { createAddProjectBtn }

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
        const newProject = projectFactory(input.value)
        createProject(newProject.title)
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

    return addProjectBtn
}

function createProject(title) {
    const ctner = document.querySelector('.projects-ctner')

    const projectsItem = document.createElement('div')
    projectsItem.classList.add('item')
    projectsItem.textContent = title

    ctner.appendChild(projectsItem)
}