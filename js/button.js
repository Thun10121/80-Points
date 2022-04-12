//!popups
let ins = document.getElementById("instructions-page");
let insContent = document.getElementById("instructions-content");
let insModal = document.getElementById("instructions-modal");
let set = document.getElementById("settings-page");
let setContent = document.getElementById("settings-content");
let setModal = document.getElementById("settings-modal");
let log = document.getElementById("login-page");
let logContent = document.getElementById("login-content");
let logModal = document.getElementById("login-modal");

let createButton = document.getElementById("front-button-create");
let joinButton = document.getElementById("front-button-join");
let frontButtonDIV = document.getElementById("front-buttons-div");
let frontPageElement = document.getElementById("front-page-elements");
let frontGame = document.getElementById("front-game-content");
let joinBackButton = document.getElementById("front-button-back");

let bottomBar = document.getElementById("bottom-bar-border");
let bottomBarChild = document.getElementById("#bottom-bar").childNodes;

let frontIcon = document.getElementById("icons");

let setStatus = false;
let insStatus = false;
let logStatus = false;

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

function settings() {
    console.log(setStatus);
    if (setStatus) {
        setTimeout(function () {
            setModal.style.opacity = "0";
            setContent.style.opacity = "0";
        }, 750);
        setContent.style.display = 'none';
        setModal.style.display = 'none';
        set.style.display = 'none';
        setStatus = false;
    } else {
        setContent.style.display = 'flex';
        setModal.style.display = 'block';
        set.style.display = 'flex';
        setTimeout(function () {
            setModal.style.opacity = ".75";
        }, 10);
        setTimeout(function () {
            setContent.style.opacity = "1";
        }, 100);
        setStatus = true;
    }
}

function logins(){
    console.log(logStatus);
    if (logStatus) {
        setTimeout(function () {
            logModal.style.opacity = "0";
            logContent.style.opacity = "0";
        }, 750);
        logContent.style.display = 'none';
        logModal.style.display = 'none';
        log.style.display = 'none';
        logStatus = false;
    } else {
        logContent.style.display = 'flex';
        logModal.style.display = 'block';
        log.style.display = 'flex';
        setTimeout(function () {
            logModal.style.opacity = ".75";
        }, 10);
        setTimeout(function () {
            logContent.style.opacity = "1";
        }, 100);
        logStatus = true;
    }
}

function join() {
    createButton.style.display = "none";
    joinButton.style.display = "none";
    joinBackButton.style.display = "flex";
    frontButtonDIV.innerHTML = `
    <div id="front-button-input-background-border">
        <input id="front-join-input" class="front-button"  maxlength="10" placeholder="Room Code"></input>
    </div>
    <div id="front-button-enter-background-border">
        <button id="front-button-enter" class="front-button" onclick="enterCode()">
            <p id="front-button-enter-text" class="front-button-text">ENTER</p>
        </button>
    </div>
    `;
}

function create(){
    createButton.style.display = "none";
    joinButton.style.display = "none";
    frontPageElement.style.display = "none";
    frontGame.style.display = "flex";
    bottomBar.style.display= "flex";
    frontIcon.style.display = "none";
    for(let i = 0; i < bottomBarChild.length; i++){
        bottomBarChild[i].style.display = "flex";
    }
    console.log("hi");
}

function back(){
    frontButtonDIV.innerHTML = `
    <div id="front-button-background-border">
        <button id="front-button-create" class="front-button" onclick="create()">
        <p id="front-button-create-text" class="front-button-text">CREATE</p>
    </button>
    </div>
    <div id="front-button-background-border">
        <button id="front-button-join" class="front-button" onclick="join()">
            <p id="front-button-join-text" class="front-button-text">JOIN</p>
        </button>
    </div>
    `;
    bottomBar.style.display = "none";
    joinBackButton.style.display = "none";
    frontGame.style.display = "none";
    frontPageElement.style.display = "flex";
}

function randomZhu(){
    rand = Math.floor(Math.random() * 13);
    zhuNumber = cardTypes[rand];
    document.location = "/html/game.html";
}

function inOrderZhu(){
    zhuNumber = "2";
    document.location = "/html/game.html";
}