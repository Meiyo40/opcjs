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
let cancelReservation = document.getElementById('cancelReservation');
let userAccess = document.getElementById('userAccess');
var user;
var timer;
var reservation;
var toggleInfo;
var canvasObj;

reserveBtn.onclick = function () {
    let availableBike = parseInt(document.getElementById('velo').placeholder);
    if (availableBike > 0) {
        canvasObj = new CanvasObj();
        canvasForm.setAttribute('style', 'display: block');
        canvasObj.canvasSaveState();
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
    let availableBike = parseInt(document.getElementById('velo').placeholder);
    if((canvasObj.signature_validation >= 5) & (availableBike > 0)){
        reservation =  new Reservation();
        reservation.onCreate();
    }
    else if(availableBike <= 0){
        alert('Pas assez de vélo disponible danss cette station');
    }
    else if((canvasObj.signature_validation > 1) && (canvasObj.signature_validation < 5)){
        alert('Votre signature semble un peu petite, merci de bien vouloir signer.');
    }
    else{
        alert('Une signature est nécessaire pour pouvoir réserver');
    }
}

clearBtn.onclick = function () {
    canvasObj.clear_canvas(user);
}

cancelReservation.onclick = function(){
    if(window.confirm("Souhaitez vous réellement annuler votre réservation ?")){
        reservation.reset(user);
    }
}
