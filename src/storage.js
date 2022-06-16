export { taskStorage, storeProject }

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

function storeProject(newP) {
    localStorage.setItem(newP.title, JSON.stringify({'tasks':[], 'description':`${newP.description}`}))
}