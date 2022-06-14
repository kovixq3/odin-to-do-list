import createTask from "./domAddTask.js";
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
            projectsCtner.appendChild(createProject(input.value))
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

function createProject(title) { 
    const domItem = document.createElement('div');
    domItem.classList.add('item');
    domItem.textContent = title;

    domItem.addEventListener('click', (e) => {
        addSelectedClass(e.target)
        updateTaskDisplay(e.target)
    })

    
    // update selected-project--title and selected-project__tasks-ctner
    // fire selected title name to a function, and have it grab data by that name?
    // 

    function addSelectedClass(i) {
        const projectsCtner = document.querySelector('.projects-ctner')
        const childrenArr = [...projectsCtner.children]
        childrenArr.forEach(e => e.classList.remove('selected'));
        i.classList.add('selected')
    }

    function updateTaskDisplay(i) {
        const arr = JSON.parse(localStorage.getItem(i.textContent))
        arr.forEach((e) => console.log(e))


        const selectedProjectTitle = document.querySelector('.selected-project__title')
        const selectedProjectTasksCtner = document.querySelector('.selected-project__tasks-ctner')




        console.log(selectedProjectTitle)

    }

    return domItem;
}