const inputBox = document.querySelector("#todo-title-input");
const taskDisplayBox = document.querySelector(".task-display-box");
const clearCompletedButton = document.querySelector(".clear-completed-button");
const itemsLeftBox = document.querySelector('.items-left-text');
const displayFilterSelectionMobileDiv = document.querySelector('.display-filter-box-mobile');
let displayFilter='all'


function createDisplayElement(id, taskStatus, taskText){
    // outer div element
    const taskDiv = document.createElement('div')
    taskDiv.id = `task-item-box-${id}`
    taskDiv.classList.add('task-item-box')

    //to create a checkbox input
    const taskInput = document.createElement('input')
    taskInput.className = 'task-checkbox add-your-css-class-here'
    taskInput.type = 'checkbox'
    taskInput.dataset.inputId = id
    if (taskStatus === 'checked'){
        taskInput.checked = true
    }
    else{
        taskInput.checked = false
    }

    // to add a label to check box
    const taskTextNode = document.createTextNode(taskText)
    const taskLabel = document.createElement('label')
    taskLabel.className = `task-text-${taskStatus}`
    taskLabel.appendChild(taskTextNode)

    // to add a cross button
    const taskCrossButton = document.createElement('button')
    taskCrossButton.className = "cross-mark-button"
    taskCrossButton.dataset.buttonId = id

    //to append all the elements 
    taskDiv.appendChild(taskInput)
    taskDiv.appendChild(taskLabel)
    taskDiv.appendChild(taskCrossButton)

    return taskDiv

}


function displayTask (displayFilter) {
    taskDisplayBox.innerHTML = '';
    

    // to display no task existing when needed
    if (localStorage.length === 0){
        const text = document.createTextNode('No todo items left!')
        const par = document.createElement('p')
        par.className = 'no-items-left-box'
        par.appendChild(text)
        const div = document.createElement('div')
        div.className = 'task-item-box-no-item'
        div.appendChild(par)
        taskDisplayBox.appendChild(div)
    }

    //to display tasks and items left
    const fragment = new DocumentFragment()
    let itemsLeft = 0;
    for(let i = 0; i < localStorage.length; i++){
        let taskText = localStorage.key(i);
        let taskStatus = localStorage.getItem(taskText);
        
        if (displayFilter==="active" && taskStatus==="unchecked"){
            fragment.appendChild(createDisplayElement(i, taskStatus, taskText))
            fragment.appendChild(document.createElement('hr'))
        }

        if (displayFilter==="completed" && taskStatus==="checked"){
            fragment.appendChild(createDisplayElement(i, taskStatus, taskText))
            fragment.appendChild(document.createElement('hr'))
            }

        if (displayFilter==="all"){
            fragment.appendChild(createDisplayElement(i, taskStatus, taskText))
            fragment.appendChild(document.createElement('hr'))
        }

        if (taskStatus === 'unchecked'){
            itemsLeft ++
        }
    }
    taskDisplayBox.appendChild(fragment);
    itemsLeftBox.innerText = `${itemsLeft} items left`
    
}

// to read user input from the text box
inputBox.addEventListener('keyup',(event) => {
    if(event.key === 'Enter'){
        localStorage.setItem(inputBox.value, 'unchecked');
        inputBox.value='';
        displayTask(displayFilter);
    }
})

// to delete a task from local storage and to redisplay the task list
taskDisplayBox.addEventListener('click', (event) => { 
    if(event.target.className === 'cross-mark-button'){
        i = event.target.dataset.buttonId;
        console.log(event.target)
        let taskText = document.querySelector(`div[id="task-item-box-${i}"] label`).innerText;
        localStorage.removeItem(taskText);
        displayTask(displayFilter);
    }
})

// to select the task done
taskDisplayBox.addEventListener('change', event => {
    if(event.target.classList.contains('task-checkbox')) {
        i = event.target.dataset.inputId;
        let labelElement = document.querySelector(`div[id="task-item-box-${i}"] label`);
        let taskText = labelElement.innerText;
        if(event.target.checked){
            localStorage.setItem(taskText, 'checked');
            labelElement.classList.add('task-text-checked');
        } else {
            localStorage.setItem(taskText, 'unchecked');
            labelElement.classList.add ('task-text-unchecked');
        }
    }
    displayTask(displayFilter);
})

// to remove all the task 
clearCompletedButton.addEventListener('click', () => {
    
    for(let i = localStorage.length - 1; i >= 0; i--){
        let taskText = localStorage.key(i);
        let taskStatus = localStorage.getItem(taskText);
        console.log(taskText, taskStatus,i)
        if (taskStatus === 'checked'){
            console.log(taskText, taskStatus,i)
            localStorage.removeItem(taskText);
        }
    }
    
    displayTask(displayFilter);
})

// to select display filter on mobile
displayFilterSelectionMobileDiv.addEventListener('click', event => {
    if(event.target.id ==='filter-all'){
        displayFilter = 'all'
    }

    if(event.target.id ==='filter-active'){
        displayFilter = 'active'
    }

    if(event.target.id ==='filter-completed'){
        displayFilter = 'completed'
    }

    displayTask(displayFilter)
})



displayTask(displayFilter);