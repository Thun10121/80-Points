let ins = document.getElementById("instructions-page");
let insContent = document.getElementById("instructions-content");
let insModal = document.getElementById("instructions-modal");
let createButton = document.getElementById("front-button-create");
let joinButton = document.getElementById("front-button-join");
let frontButtonDIV = document.getElementById("front-buttons-div");
let frontPageElement = document.getElementById("front-page-elements");
let frontGame = document.getElementById("front-game-content");
let backButton = document.getElementById("front-game-button-back");


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
    backButton.style.display = "flex";
    frontButtonDIV.innerHTML = `
    <input id="front-join-input" class="front-button" type="number" placeholder="Room Code"></input>
    <button id="front-button-enter" class="front-button" onclick="enterCode()">
        <p id="front-button-enter-text" class="front-button-text">ENTER</p>
    </button>
    <button id="front-button-back" class="front-button" onclick="back()">
        <p id="front-button-back-text" class="front-button-text">BACK</p>
    </button>
    `;
}

function create(){
    createButton.style.display = "none";
    joinButton.style.display = "none";
    backButton.style.display = "flex";
    frontPageElement.style.display = "none";
    frontGame.style.display = "flex";
}

function back(){
    frontButtonDIV.innerHTML = `
    <button id="front-button-create" class="front-button" onclick="create()">
        <p id="front-button-create-text" class="front-button-text">CREATE</p>
    </button>
    <button id="front-button-join" class="front-button" onclick="join()">
        <p id="front-button-join-text" class="front-button-text">JOIN</p>
    </button>
    `;
    backButton.style.display = "none";
    frontGame.style.display = "none";
    frontPageElement.style.display = "flex";
}