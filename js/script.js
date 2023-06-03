console.log('Start todolist');

const toDoInput = document.querySelector('#todoInput');
const toDoButton = document.querySelector('#todoButton');
const toDoList = document.querySelector('#todoList');

toDoButton.addEventListener('click', function(){
    const inputValue = toDoInput.value;
    console.log(inputValue);

    const listItem = document.createElement('li');
    toDoList.append(listItem);
    listItem.textContent = inputValue;
    toDoInput.value = '';

    const deleteButton = document.createElement('button');
    listItem.append(deleteButton);
    deleteButton.textContent = 'Удалить дело';
    deleteButton.addEventListener('click', function(){
        listItem.remove()
    })

})


