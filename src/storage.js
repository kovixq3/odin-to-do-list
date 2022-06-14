export { storeTask, storeProject }

function storeTask(newTask) {
    const selectedTitle = document.querySelector('.selected').textContent;
    const x = JSON.parse(localStorage.getItem(selectedTitle));
    // lookup anything in local storage that match project name
    // pull data out and append them to dom
    // todo: figure out how localstorage works again
}

function storeProject(newP) {
    
}

// todo:
// 1. figure out how to put them in localstorage
// 2. have a event listener to click in project selection list -> grab things in local storage and put them on dom
// 3. 