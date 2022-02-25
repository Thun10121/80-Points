let ins = document.getElementById("instructions-page");
let insContent = document.getElementById("instructions-content");
let insModal = document.getElementById("instructions-modal");
let createButton = document.getElementById("front-button-create");
let joinButton = document.getElementById("front-button-join");
let frontButtonDIV = document.getElementById("front-buttons-div");
let frontPageElement = document.getElementById("front-page-elements");
let frontGame = document.getElementById("front-game");

let insStatus = false;

function instructions() {
    console.log(insStatus);
    if (insStatus) {
        setTimeout(function () {
            insModal.style.opacity = "0";
            insContent.style.opacity = "0";
        }, 750);
        insContent.style.display = 'none';
        insModal.style.display = 'none';
        ins.style.display = 'none';
        insStatus = false;
    } else {
        insContent.style.display = 'flex';
        insModal.style.display = 'block';
        ins.style.display = 'flex';
        setTimeout(function () {
            insModal.style.opacity = ".75";
        }, 10);
        setTimeout(function () {
            insContent.style.opacity = "1";
        }, 100);
        insStatus = true;
    }
}

function join() {
    createButton.style.display = "none";
    joinButton.style.display = "none";
    frontButtonDIV.innerHTML = `
    <input id="front-join-input" class="front-button" type="number" placeholder="room code"></input>
    <button id="front-button-enter" class="front-button" onclick="enterCode()">
        <p id="front-button-enter-text" class="front-button-text">enter</p>
    </button>`;
}

function create(){
    createButton.style.display = "none";
    joinButton.style.display = "none";
    frontPageElement.style.display = "none";
    frontGame.style.display = "flex";
}