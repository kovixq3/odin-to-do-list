export { taskStorage, projectStorage, taskStorageDelete }

function taskStorage(newTask, toReplaceTitle) {
    const selectedTitle = document.querySelector('.selected').textContent;
    const tasks = JSON.parse(localStorage.getItem(selectedTitle)).tasks;
    const description = JSON.parse(localStorage.getItem(selectedTitle)).description

    if (toReplaceTitle) {
        tasks[tasks.findIndex((e) => e.title === toReplaceTitle)] = newTask
    } else {
        tasks.push(newTask)
    }
    
    localStorage.setItem(selectedTitle, JSON.stringify({tasks, description}))
}

function projectStorage(newProject) {
    localStorage.setItem(newProject.title, JSON.stringify({'tasks':[], 'description':`${newProject.description}`}))
}

function taskStorageDelete(a) {
    const selectedTitle = document.querySelector('.selected').textContent;
    const tasks = JSON.parse(localStorage.getItem(selectedTitle)).tasks;
    const description = JSON.parse(localStorage.getItem(selectedTitle)).description

    tasks.splice(tasks.findIndex((e) => e.title === a), 1)
    localStorage.setItem(selectedTitle, JSON.stringify({tasks, description}))
}