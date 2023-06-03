console.log('Start todolist');

const playersList = ['Petr', 'Serg'];

const reserv = ['Oleg', "Vadim"];

document.cookie = 'players=' + encodeURIComponent(playersList);
document.cookie = 'reserve=' + encodeURIComponent(reserv);


const splittedCookies = document.cookie.split('; ').map((el) => {
    const splittedEl= el.split('=');
    const obj = {
        name: splittedEl[0],
        value: splittedEl[1] // доделать парсинг кукис в массив
    }
    return obj;
});
console.log(splittedCookies); 
console.log(splittedCookies.find((el) => el.name === 'players')); 
// найти нужный кукис и вытащить оттуда массив для отрисовки его на странице

//[1].split('%2C')

const state = {
   todoListCount: 0, 
   reservListCount: 0,
   allowToAdd: true,
   todoList: [
    {
        playerName: 'Jeff',
        playerNumber: 31,
        description: 'about this player'
    },
   ]
};

const toDoInput = document.querySelector('#todoInput');
const toDoButton = document.querySelector('#todoButton');
const toDoList = document.querySelector('#todoList');
const reserveList = document.querySelector('#reservList');


const moveElem = function (oldElem, newElem, toPlace){
    console.log('move elem');
    oldElem.remove();
    toPlace.append(newElem);
};
    const deleteButton = document.createElement('button');

toDoButton.addEventListener('click', function(){
    const inputValue = toDoInput.value;
    console.log(inputValue);

    const listItem = document.createElement('li');
    toDoList.append(listItem);
    listItem.textContent = inputValue;
    toDoInput.value = '';

    const reserveButton = document.createElement('button');
    listItem.append(reserveButton);
    listItem.append(deleteButton)
    reserveButton.textContent = 'Отправить в запас';
    deleteButton.textContent = 'Удалить'

    deleteButton.addEventListener('click', function(){
        listItem.remove(inputValue)
    })

    const moveToReserve = function(){
        // Перед тем как переместить(удалить) пункт списка в резер, мы "читим память от лишнего события"  
        // reserveButton.removeEventListener('click', moveToReserve)

        listItem.remove();
        const resList = document.createElement('li');
        reserveList.append(resList);
       
        resList.textContent = inputValue;
        const backToMainBtn = document.createElement('button');
        resList.append(backToMainBtn);
        resList.append(deleteButton);

        backToMainBtn.textContent = 'Вернуть в состав';

        const moveToMain = function (){
            console.log('move to main');
            resList.remove();
            toDoList.append(listItem);
        }
        // backToMainBtn.addEventListener('click', moveToMain);

        const moveElemCaller = (e)=> {
            console.log('moveElemCaller');
            moveElem(resList, listItem, toDoList);
        }
        backToMainBtn.addEventListener('click', moveElemCaller);
        //backToMainBtn.removeEventListener('click', moveToMain);
    };


    reserveButton.addEventListener('click', moveToReserve)
    // Суть задания:
    // 1. Список сохранялся после перезагрузки страницы ()
    // 2. 
})

// Для удаления события нужно вызвать метод removeEventListener у того объекта, у которого вы хотите удалить событие. 

// Не забудьте указать тип события и имя удаляемой функции (т.к. на одном и том же событии могут висеть разные функции).

// myObj.removeEventListener('click', myClick);

