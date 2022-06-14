export default function projectFactory(title) {
    const addTask = () => {
        console.log('h')
    }
    // somehow i feel like this should have a add task to project method
    // open for extension, close for modification
    return { title }
}