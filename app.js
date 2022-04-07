//need to restructure it comptely by making use of some data strature
//clear button is not working as intented
//need to add some more buttons

const inputBox = document.querySelector("#todo-title-input");
const taskDisplayBox = document.querySelector(".task-display-box");
const clearAllButton = document.querySelector(".clear-all-button");
const clearCompletedButton = document.querySelector(".clear-completed-button");

function displayTask () {
    taskDisplayBox.innerHTML = '';
    for(let i = 0; i < localStorage.length; i++){
        let taskText = localStorage.key(i);
        let taskStatus = localStorage.getItem(taskText);
        let htmlMarkup = '';
        if (taskStatus === 'checked'){
            htmlMarkup = `
            <div class="task-item-box-${i}">
                <input class="task-checkbox" type="checkbox" data-input-id=${i} checked>
                <label class="task-text-${taskStatus}">${taskText}</label>
                <button class="cross-mark-button" data-button-id=${i}></button>
            </div>`} 
        else {
            htmlMarkup = `
            <div class="task-item-box-${i}">
                <input class="task-checkbox" type="checkbox" data-input-id=${i}>
                <label class="task-text-${taskStatus}">${taskText}</label>
                <button class="cross-mark-button" data-button-id=${i}></button>
            </div>`
        }                     
        taskDisplayBox.insertAdjacentHTML("afterbegin", htmlMarkup);
    }
}

inputBox.addEventListener('keyup',(event) => { // a much better event is needed this function is to add events
    if(event.key === 'Enter'){
        localStorage.setItem(inputBox.value, 'unchecked');
        displayTask();
    }
})

taskDisplayBox.addEventListener('click', (event) => { // to delete a task from local storage and to redisplay the task list
    if(event.target.className === 'cross-mark-button'){
        i = event.target.dataset.buttonId;
        let taskText = document.querySelector(`div[class="task-item-box-${i}"] label`).innerText;
        localStorage.removeItem(taskText);
        displayTask();
    }
})

taskDisplayBox.addEventListener('change', event => {
    if(event.target.className === 'task-checkbox') {
        i = event.target.dataset.inputId;
        let lableElement = document.querySelector(`div[class="task-item-box-${i}"] label`);
        let taskText = lableElement.innerText;
        if(event.target.checked){
            localStorage.setItem(taskText, 'checked');
            lableElement.className = 'task-text-checked';
        } else {
            localStorage.setItem(taskText, 'unchecked');
            lableElement.className = 'task-text-unchecked';
        }
    }
})

clearAllButton.addEventListener('click', () => {
    localStorage.clear();
    displayTask();
})

clearCompletedButton.addEventListener('click', () => {
    
    for(let i = 0; i < localStorage.length; i++){
        let taskText = localStorage.key(i);
        let taskStatus = localStorage.getItem(taskText);
        if (taskStatus === 'checked'){
            console.log(taskText, taskStatus,i)
            localStorage.removeItem(taskText);
        }
    }
    
    displayTask();
})

displayTask();