function mswitch(){
    let switches = document.getElementById("mode-switch-nob");
    let model = document.getElementById("mode-switch");
    console.log(darkModeStatus);
    if(darkModeStatus) {
        switches.style.marginLeft = modeSwitchWidth;
        model.style.backgroundColor = base1
    } else{
        switches.style.marginLeft = "0";
        model.style.backgroundColor = base2;
    }
    darkModeStatus = !darkModeStatus;
}