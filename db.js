// import Dexie from "./dexie"

var db = new Dexie("taskDatabase");

db.version(1).stores({
    tasks: `
        ++id,
        taskName,
        dueDate,
        assignedTo`,
});

// db.delete()

function getAllTasksFromDB() {
    return db.tasks.toArray().then((data) => {
        return data
    })

}

function addTaskToDB(taskName, dueDate, assignedTo) {
    const id = db.tasks.put({ taskName, dueDate, assignedTo })
        .then(() => true)
        .catch(err => {
            alert("Ouch... " + err);
        });
    return id;
}

async function queryByName(name) {
    if (name === undefined) return 0
    return await db.students
        .filter((student) => {
            return student.name === name
        })
        .toArray()
}