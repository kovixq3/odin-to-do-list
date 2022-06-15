export { storeTask, storeProject }

function storeTask(newT) {
    for (let index = 0; index < localStorage.length; index++) {
        const e = localStorage.key(index)
        const selectedTitle = document.querySelector('.selected').textContent;
        if (JSON.parse(e).title === selectedTitle) {
            const arr = JSON.parse(localStorage.getItem(e))
            arr.push(newT)
            localStorage.setItem(e, JSON.stringify(arr))
        }
    }
}

function storeProject(newP) {
    localStorage.setItem(JSON.stringify(newP), JSON.stringify([]))
}