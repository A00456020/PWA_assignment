async function main() 
{
    const form = document.querySelector('form');
    const duedate_input = document.querySelector("[name='duedate']");
    const assignedto_input = document.querySelector("[name='assignedto']");
    const tasksList = document.getElementById('tasks');
    const name_input = document.querySelector("[name='tname']");

    const existingTasks = await getAllTasksFromDB()

    console.log(existingTasks)

    const taskData = [];

    existingTasks.forEach(task => {
        addTask(task.id, task.taskName, task.dueDate, task.assignedTo);
    });


    function addTask(id=null, taskName, duedate, assignedto) 
    {
        taskid = id
        const div = document.createElement('div')
        div.classList.add('task')
        const h1 = document.createElement('h1')
        h1.innerHTML = taskName;
        const h2 = document.createElement('h2')
        h2.innerHTML = String("Due Date: ") + duedate;
        const p = document.createElement('p')
        p.innerHTML = String("Assigned: ") + assignedto;

        taskData.push({ id, taskName, duedate, assignedto });

        div.appendChild(h1)
        div.appendChild(h2)
        div.appendChild(p)
        tasksList.appendChild(div)

        localStorage.setItem('tasks', JSON.stringify(taskData));
        if(taskid == null){
            addTaskToDB(taskName, duedate, assignedto)
        }
        name_input.value = ''
        duedate_input.value = ''
        assignedto_input.value = ''
    }

    form.onsubmit = (event) => {
        event.preventDefault();
        addTask(null, name_input.value, duedate_input.value, assignedto_input.value);
    }
}

main()