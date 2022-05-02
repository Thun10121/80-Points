//!popups
let modal = document.getElementById("modal");

let exit = document.getElementById("Exitalert");
let exitContent = document.getElementById("exit-content");
let exitModal = document.getElementById("exit-modal");

let createButton = document.getElementById("front-button-create");
let joinButton = document.getElementById("front-button-join");
let frontButtonDIV = document.getElementById("front-buttons-div");
let frontPageElement = document.getElementById("front-page-elements");
let frontGame = document.getElementById("front-game-content");

const load = document.getElementById("loading");

let bottomBar = document.getElementById("bottom-bar-border");

let frontIcon = document.getElementById("icons");

let frontPage = document.getElementById("front-page");

let exitStatus = false;

function loading() {
    load.style.opacity = 0;
    frontPage.style.display = "flex";
    load.style.display = 'none';

    // frontPage.style.display = "none";
    // load.style.display = 'flex';
    // load.style.opacity = 100;
    // setTimeout(() => {
    //     load.style.opacity = 0;
    //     setTimeout(() => {
    //         frontPage.style.display = "flex";
    //         load.style.display = 'none';
    //     }, 1000);
    // }, Math.floor(Math.random() * 2 + 2) * 1500);
}

function popup(div) {
    let content = document.getElementById(`${div}-page`);
    content.classList.toggle("popup-show");
    modal.classList.toggle("popup-show");
    setTimeout(function () {
        modal.classList.toggle("popup-show-opacity-modal");
    }, 10);
    setTimeout(function () {
        content.classList.toggle("popup-show-opacity");
    }, 100);
    setTimeout(function () {
        content.classList.toggle("popup-hide-opacity");
        modal.classList.toggle("popup-hide-opacity");
    }, 1000);
    modal.classList.toggle("popup-hide");
    content.classList.toggle("popup-hide");
}

function exitAlert() {
    if (exitStatus) {
        setTimeout(function () {
            exitModal.style.opacity = "0";
            exitContent.style.opacity = "0";
        }, 750);
        exitContent.style.display = 'none';
        exitModal.style.display = 'none';
        exit.style.display = 'none';
        exitStatus = false;
    } else {
        exitContent.style.display = 'flex';
        exitModal.style.display = 'block';
        exit.style.display = 'flex';
        setTimeout(function () {
            exitModal.style.opacity = ".75";
        }, 10);
        setTimeout(function () {
            exitContent.style.opacity = "1";
        }, 100);
        exitStatus = true;
    }
}

function join() {
    createButton.style.display = "none";
    joinButton.style.display = "none";
    frontButtonDIV.innerHTML = `
    <div id="front-button-input-background-border" class="goldBK">
        <input id="front-join-input" class="front-button" autocomplete="off" maxlength="10" placeholder="Room Code"></input>
    </div>
    <div id="front-button-enter-background-border" class="goldBK">
        <button id="front-button-enter" class="front-button" onclick="enterCode()">
            <p id="front-button-enter-text" class="front-button-text goldText">ENTER</p>
        </button>
    </div>
    <div id="front-button-home-background-border" class="goldBK">
        <div id="front-button-home">
            <svg id="front-button-home-svg" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24"
                width="24px" onclick="back()">
                <linearGradient id="gold1" x1="36.44" y1="51.18" x2="86.38" y2="30.25" gradientUnits="userSpaceOnUse">
                    <stop offset="0.34" stop-color="#f0d750" />
                    <stop offset="0.56" stop-color="#e7cd3b" />
                    <stop offset="0.72" stop-color="#bc8c1f" />
                    <stop offset="0.82" stop-color="#d9ad15" />
                    <stop offset="1" stop-color="#fce186" />
                </linearGradient>
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
            </svg>
        </div>
    </div>
    `;
}

function create() {
    createButton.style.display = "none";
    joinButton.style.display = "none";
    frontPageElement.style.display = "none";
    frontGame.style.display = "flex";
    bottomBar.style.display = "flex";
    frontIcon.style.display = "none";
}

function back() {
    frontButtonDIV.innerHTML = `
    <div id="front-button-background-border" class="goldBK">
        <button id="front-button-create" class="front-button" onclick="create()">
        <p id="front-button-create-text" class="front-button-text goldText">CREATE</p>
    </button>
    </div>
    <div id="front-button-background-border" class="goldBK">
        <button id="front-button-join" class="front-button" onclick="join()">
            <p id="front-button-join-text" class="front-button-text goldText">JOIN</p>
        </button>
    </div>
    `;
    bottomBar.style.display = "none";
    frontGame.style.display = "none";
    frontPageElement.style.display = "flex";
    frontIcon.style.display = "flex";
}

function randomZhu() {
    rand = Math.floor(Math.random() * 13);
    zhuNumber = cardTypes[rand];
    document.location = "/html/game.html";
    bottomBar.style.display = "flex";
}

function inOrderZhu() {
    zhuNumber = "2";
    document.location = "/html/game.html";
    bottomBar.style.display = "flex";
}

function home() {
    document.location = "../index.html";
}