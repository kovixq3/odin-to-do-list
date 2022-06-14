import { createAddTaskBtn } from "./domAddTask"
import { createAddProjectBtn, createProject } from "./domAddProject"

export function onLoad() {
    const body = document.querySelector('body');
    const main = document.createElement('div');
    main.classList.add('main')


    const projectSection = document.createElement('div');
    projectSection.classList.add('project-section');
    const projectSectionHeader = document.createElement('span')
    projectSectionHeader.classList.add('project-section--header')
    projectSectionHeader.textContent = 'Projects'
    const border = document.createElement('div')
    border.classList.add('border')


    // projects section
    // HUGE NOTE
    // should do something like populate everything in local storage and then just keep repopulate every event
    const projectsCtner = document.createElement('div')
    projectsCtner.classList.add('projects-ctner')

    const addProjectBtnCtner = document.createElement('div')
    addProjectBtnCtner.classList.add('add-project-ctner')
    addProjectBtnCtner.appendChild(createAddProjectBtn())

    projectsCtner.appendChild(createProject('Example'))


    projectSection.appendChild(projectSectionHeader)
    projectSection.appendChild(border)
    projectSection.appendChild(projectsCtner)
    projectSection.appendChild(addProjectBtnCtner)


    // task section
    const taskSection = document.createElement('div');
    taskSection.classList.add('task-section');

    const selectedProjectTitle = document.createElement('div');
    selectedProjectTitle.classList.add('selected-project__title')
    // need to modify to make this title sync with selected project
    selectedProjectTitle.textContent = 'Example Project'

    const selectedProjectTasksCtner = document.createElement('div');
    selectedProjectTasksCtner.classList.add('selected-project__tasks-ctner')

    const addTaskCtner = document.createElement('div')
    addTaskCtner.classList.add('add-task-ctner')
    addTaskCtner.appendChild(createAddTaskBtn())

    taskSection.appendChild(selectedProjectTitle)
    taskSection.appendChild(border.cloneNode(false))
    taskSection.appendChild(selectedProjectTasksCtner)
    taskSection.appendChild(addTaskCtner)


    main.appendChild(projectSection)
    main.appendChild(taskSection)
    body.appendChild(main);
}