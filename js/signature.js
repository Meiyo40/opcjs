//CANVAS DISPLAY + BUTTON BEHAVIOR
let reserveBtn = document.getElementById('reserve-btn');
let canvasForm = document.getElementById('signature-form');
let formPad = document.getElementById('UserForm');
let cancelBtn = document.getElementById('cancel');
let saveBtn = document.getElementById('save');
let clearBtn = document.getElementById('clear');
let userUI = document.getElementById('user-information');
let message = document.getElementById('reservNone');
let oldMessage = document.getElementById('reservOK');
var user;

reserveBtn.onclick = function () {
    let availableBike = parseInt(document.getElementById('velo').placeholder);
    if (availableBike > 0) {
        canvasForm.setAttribute('style', 'display: block');
        canvasSaveState();
        reserveBtn.setAttribute('style', 'display: none');
        formPad.setAttribute('style', 'height: auto');
    } else {
        alert('Cette station ne dispose de pas velo disponible, merci de choisir une autre station');
    }
};

cancelBtn.onclick = function () {
    canvasForm.setAttribute('style', 'display: none');
    reserveBtn.setAttribute('style', 'display: block margin: 0 auto');
    formPad.setAttribute('style', 'height: 480px');
}

saveBtn.onclick = function () {
    
    if(signature_validation >= 40){
        let userName = document.getElementById('name');
        let userFirstName = document.getElementById('firstname');
        let img = document.getElementById('signature-pad');
        let urlIMG = img.toDataURL();
        let resaStation = document.getElementById('nameStation').placeholder;

        user = new User(userName.value, userFirstName.value, new Date(), resaStation, urlIMG);

        sessionStorage.setItem('signature', urlIMG);
        sessionStorage.setItem('station', resaStation);
        userInfo(minute, seconde); //On edit la partie pour les informations
        localStorage.setItem('user', JSON.stringify(user));
        
        message.setAttribute('style', 'display: none');
        oldMessage.setAttribute('style', 'display: block');
    }
    else if((signature_validation > 1) && (signature_validation < 40)){
        alert('Votre signature semble un peu petite, merci de bien vouloir signer.');
    }
    else{
        alert('Une signature est nécessaire pour pouvoir réserver');
    }
}

clearBtn.onclick = function () {
    signature_validation = 0;
    user.resetReservation();
    clear_canvas();
}


/*

CANVAS

*/
// Variables 
let color = "#000";
let painting = false;
let started = false;
let width_brush = 2;
let signature_validation = 0;
let canvas = document.querySelector('#signature-pad');
let cursorX, cursorY;
let context = canvas.getContext('2d');
let paintWindow = document.querySelector('#canvas-container');
let windowStyle = getComputedStyle(paintWindow);
//Ajuste la taille du canvas a son container, JS oblige pour éviter des soucis avec les coords de la souris
context.canvas.width = parseInt(windowStyle.getPropertyValue('width'));
context.canvas.height = parseInt(windowStyle.getPropertyValue('height'));

canvas.addEventListener("touchstart", onmousedown, false);
canvas.addEventListener("touchmove", onmousemove, true);
canvas.addEventListener("touchend", onmouseup, false);
document.body.addEventListener("touchcancel", onmouseup, false);


canvas.addEventListener("mousedown", function (e) {
    // Click souris enfoncé sur le canvas, je dessine :
    painting = true;
    // Coordonnées de la souris :
    cursorX = (e.pageX - this.offsetLeft);
    cursorY = (e.pageY - this.offsetTop);
    paint();
});

// Relachement du Click arrête de dessiner :
canvas.addEventListener("mouseup", function () {
    painting = false;
    started = false;
});

// Mouvement de la souris sur le canvas :
canvas.addEventListener("mousemove", function (e) {
    // Si je suis en train de dessiner (click souris enfoncé) :
    if (painting) {
        // Set Coordonnées de la souris :
        cursorX = (e.pageX - this.offsetLeft);
        cursorY = (e.pageY - this.offsetTop);

        // Dessine une ligne :
        drawLine();
    }
});
function canvasSaveState(){
    context.save();
}
function paint() {
    context.stroke();
}
// Fonction qui dessine une ligne :
function drawLine() {
    // Si c'est le début, j'initialise
    if (!started) {
        // Je place mon curseur pour la première fois :
        context.beginPath();
        context.moveTo(cursorX, cursorY);
        started = true;
    }
    // Sinon je dessine
    else {
        context.lineTo(cursorX, cursorY);
        context.strokeStyle = color;
        context.lineWidth = width_brush;
        context.stroke();
        signature_validation += 1;
    }
}

// Clear du Canvas :
function clear_canvas() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.beginPath();
    context.restore();
    user.signature = null;
}


//MOBILE TOUCH 

canvas.addEventListener('touchstart', function(e){
    let coord = getTouchPos(canvas, e);
    cursorX = coord.x;
    cursorY = coord.y;
    
    paint();
});

canvas.addEventListener("touchend", function (e) {
  var mouseEvent = new MouseEvent("mouseup", {});
  canvas.dispatchEvent(mouseEvent);
});

canvas.addEventListener('touchmove', function(e){
    let coord = getTouchPos(canvas, e);
    cursorX = coord.x;
    cursorY = coord.y;
    
    drawLine();
});

function getTouchPos(canvasDom, touchEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
    x: touchEvent.touches[0].clientX - rect.left,
    y: touchEvent.touches[0].clientY - rect.top
  };
}


canvas.addEventListener("touchstart",  function(event) {event.preventDefault()})
canvas.addEventListener("touchmove",   function(event) {event.preventDefault()})
canvas.addEventListener("touchend",    function(event) {event.preventDefault()})
canvas.addEventListener("touchcancel", function(event) {event.preventDefault()})