console.log("Start todolist");


const splittedCookies = document.cookie.split("; ").map((el) => {
  const splittedEl = el.split("=");
  const obj = {
    name: splittedEl[0],
    value: splittedEl[1], // доделать парсинг кукис в массив
  };
  return obj;
});
console.log(splittedCookies);
console.log(splittedCookies.find((el) => el.name === "players"));
// найти нужный кукис и вытащить оттуда массив для отрисовки его на странице

//[1].split('%2C')

const state = {
  todoListCount: 0,
  reservListCount: 0,
  allowToAdd: true,
  todoList: [
    {
      playerName: "Jeff",
      playerNumber: 31,
      description: "about this player",
    },
  ],
};

const toDoInput = document.querySelector("#todoInput");
const toDoButton = document.querySelector("#todoButton");
const toDoList = document.querySelector("#todoList");
const reserveList = document.querySelector("#reservList");

const playersList = [];

const moveElem = function (oldElem, newElem, toPlace) {
  console.log("move elem");
  oldElem.remove();
  toPlace.append(newElem);
};

const moveToReserve = function(listItem, value) {
    // Перед тем как переместить(удалить) пункт списка в резер, мы "читим память от лишнего события"
    // reserveButton.removeEventListener('click', moveToReserve)
    const inputValue =  value;
    listItem.remove();
    const reservePlayer = document.createElement("li");
    reserveList.append(reservePlayer);
    reservePlayer.textContent = inputValue;

    
    const backToMainBtn = document.createElement("button");
    const deleteButton = document.createElement("button");

    reservePlayer.append(backToMainBtn);
    reservePlayer.append(deleteButton);

    backToMainBtn.textContent = "Вернуть в состав";
    deleteButton.textContent = "Удалить";

    const moveElemCaller = (e) => {
      console.log("moveElemCaller");
      moveElem(reservePlayer, listItem, toDoList);
    };
    backToMainBtn.addEventListener("click", moveElemCaller);
    //backToMainBtn.removeEventListener('click', moveToMain);
    deleteButton.addEventListener("click", function () {
        reservePlayer.remove();
    });
};

function createPlayer(value) {
    const listItem = document.createElement("li");
    toDoList.append(listItem);
    listItem.textContent = value;
    toDoInput.value = "";
    
    const reserveButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    listItem.append(reserveButton);
    listItem.append(deleteButton);
    reserveButton.textContent = "Отправить в запас";
    deleteButton.textContent = "Удалить";


    reserveButton.addEventListener("click", function() {
        moveToReserve(listItem, value);
    });
    
    deleteButton.addEventListener("click", function () {
        console.log('delete player');
        listItem.remove();
    });

    return listItem;
}

// Записать в кукис новый список игроков
// setToCookiesPlayersList
function setToCookiesPlayersList(){
    document.cookie = "playersList=" + encodeURIComponent(playersList);
}

toDoButton.addEventListener("click", function () {
  const inputValue = toDoInput.value;  
  createPlayer(inputValue);

  playersList.push(inputValue);
  setToCookiesPlayersList();
});


function getCookie(cookieName) {
    const cookiesSplitted = document.cookie.split("; ");
    console.log(cookiesSplitted);

    let cookieValue;
    cookiesSplitted.forEach(function(cookie){
        const splittedCookie = cookie.split('=');
        if (splittedCookie.indexOf(cookieName) !== -1){
            let encodedCookieValue = splittedCookie[1];
            let decodedCookieValue = decodeURIComponent(encodedCookieValue);
            cookieValue = decodedCookieValue.split(',');
        };
    })
    return cookieValue
}

window.addEventListener('load', function() {
    const playersListFromCookie = getCookie('playersList');
    
    // playersListFromCookie.forEach(function(player, inedex, arr){
    //     createPlayer(player)
    // })
    playersListFromCookie.forEach(createPlayer);
})


