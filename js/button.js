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

let bottomBar = document.getElementById("bottom-bar-border");

let frontIcon = document.getElementById("icons");

let setStatus = false;
let insStatus = false;
let logStatus = false;

function instructions() {
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

function logins() {
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
    frontButtonDIV.innerHTML = `
    <div id="front-button-input-background-border" class="goldBK">
        <input id="front-join-input" class="front-button"  maxlength="10" placeholder="Room Code"></input>
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
}

function inOrderZhu() {
    zhuNumber = "2";
    document.location = "/html/game.html";
}