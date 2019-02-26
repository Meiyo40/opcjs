//STORAGE SYSTEM
//Si on a deja un utilisateur qui a été enregistré, on recupere tout et on recrée l'objet.
const basicTimer = 20;
var timer;
let minute;
let seconde;
var startTimer = false;

if(localStorage.getItem('user')){
    let tempUser = JSON.parse(localStorage.getItem('user'));
    user = new User(tempUser.name, 
                    tempUser.firstname, 
                    tempUser.dateReservation, 
                    tempUser.station, 
                    tempUser.signature,
                    tempUser.timer
                   );
    user.reset = tempUser.reset;
    
    let reservName = document.getElementById('name');
    let reservFirstName = document.getElementById('firstname');
    
    signature_validation = tempUser.signatureValidation;
    reservName.value = tempUser.name;
    reservFirstName.value = tempUser.firstname;
    userInfo();
}



if(typeof user != "undefined"){
    minute = user.timer[0];
    seconde = user.timer[1];
    
    canvasForm.setAttribute('style', 'display: block');
    reserveBtn.setAttribute('style', 'display: none');
    formPad.setAttribute('style', 'height: auto');
    
    if(user.signature != null){
        let img = new Image;
        img.src = user.signature;
        img.onload = function (){
            context.drawImage(img, 0, 0);
        };
    }
}

//Si un utilisateur existe (donc la reservation existe) et si la reservation est plus vielle que 20min, alors on reset!
if(typeof user != "undefined"){
    if(user.dateReservation != null){
        let userTS = Date.parse(user.dateReservation);
        let limitTimer = 20*60*1000; //20min
        let now = Date.now();
        if((now - userTS) > limitTimer){
            user.resetReservation();
            user.dateReservation = null;
            user.saveData();
        }
    }
    else{
        let message = document.getElementById('reservNone');
        let oldMessage = document.getElementById('reservOK');
        message.setAttribute('style', 'display: block');
        oldMessage.setAttribute('style', 'display: none');
    }
}

function startInterval(){
    timer = setInterval(diffHour, 1000);
}

function timerDraw(){
    //user.timer[0] = minute / timer[1] = seconde
    if((user.timer[0] == 0)&&(user.timer[1] == 0)){
        user.resetReservation();
    }
    
    //use user.signature for check if a registred reservation exist
    else if((user.timer[0] >= 0)&&(user.timer[1] >= -1) && user.signature){
        if (user.timer[1] ==  0){
            user.timer[1] = 59;
            user.timer[0]--;
        }
        else{
            user.timer[1]--;
        }
        userInfo(user.timer[0], user.timer[1]);
    }
    user.saveData();//On sauvegarde pour actualiser le timer dans le cache
}

function userInfo(min, scd){
    let stationName = user.station;
    //let resaName = localStorage.getItem('savedName') + ' ' + localStorage.getItem('savedFirstName');
    let resaName = user.name + ' ' + user.firstname;
    
    let stationUI = document.getElementById('stationName');
    let nameUI = document.getElementById('userName');
    let minuteUI = document.getElementById('minute');
    let secondeUI = document.getElementById('seconde');
    
    userUI.setAttribute('style', 'display: block');
    
    stationUI.textContent = stationName;
    nameUI.textContent = resaName;
    minuteUI.textContent = min;
    if(scd < 10){
        secondeUI.textContent = "0" + scd;
    }
    else{
        secondeUI.textContent = scd;
    }
    
    //Cette fonction gere l'affichage du  bouton d'information et d'acces rapide en haut de page
    function userAccess(){
        let userAccess = document.getElementById('userAccess');
        let userAccessBtn = document.getElementById('userAccessBtn');
        let minAccess = document.getElementById('minAccess');
        let scdAccess = document.getElementById('scdAccess');
        
        let estimM = document.getElementById('estimationM');
        let estimS = document.getElementById('estimationS');
 
        
        minAccess.textContent = min;
        if(scd < 10){
            scdAccess.textContent = "0" + scd;
        }
        else{
            scdAccess.textContent = scd;
        }
        
        if(user.dateReservation != null){
            if(user.timer[0] >= 10){
                userAccess.setAttribute('style', 'background-color: green; display: block');
            }
            else if((user.timer[0] < 12) && (user.timer[0] >=7)){
                userAccess.setAttribute('style', 'background-color: yellow; display: block');
                userAccessBtn.setAttribute('style', 'color: black;');
            }
            else if((user.timer[0] < 7)&&(user.timer[0] > 3)){
                userAccess.setAttribute('style', 'background-color: orange; display: block');
            }
            else{
                userAccess.setAttribute('style', 'background-color: red; display: block;');
            }
        }
        
    }
    //Cette fonction gère l'affichage du curseur sur la timeline
    function timeline(){
        const max = 1200;
        //On recupere les secondes du timer user
        let stamp = (user.timer[0]*60) + user.timer[1];
        let timelineCursor = document.getElementById('timeline-cursor');
        
        stamp = Number.parseFloat((stamp/1200)*100).toFixed(2);
        let cursorPos = (99-stamp) + '%';
        timelineCursor.style.left = cursorPos;
    }
    
    if (!startTimer){
        startTimer = true;
        clearInterval(timer);
        startInterval();
    }
    
    userAccess();
    timeline();
    
}

//USER OBJECT
function User(name, firstname, date, station, signature, remainingTime = [basicTimer, 00]){
    this.name = name;
    this.firstname = firstname;
    this.dateReservation = date;
    this.station = station;
    this.signature = signature;
    this.timer = remainingTime;
    this.signatureValidation = signature_validation;
    this.reset = false;
    
    this.saveData = function (){
        localStorage.setItem('user', JSON.stringify(user));
    }
    this.resetReservation = function(){
        this.reset = true;
        message.setAttribute('style', 'display: block');
        oldMessage.setAttribute('style', 'display: none');
        let userAccess = document.getElementById('userAccess');
        userAccess.setAttribute('style', 'display: none');
        
        this.timer = [basicTimer, 00];
        this.dateReservation = null;
        sessionStorage.removeItem('signature');
        clearInterval(timer);
        min = basicTimer;
        seconde = 0;
        startTimer = false;
        signature_validation = 0;
        clear_canvas();
        
        this.saveData();
        alert('Votre réservation n\'est plus valable !');
    }
    
    this.setHour = function(date){
        date = [date.getUTCMinutes(), date.getUTCSeconds()];
        return date;
    }
    
    this.timestampRefresh = function (){
        let now = Date.now();
    }
}

function diffHour(){
    
    //[min, scd]
    if(startTimer){
        let date = Math.round(user.dateReservation/1000);
        let now = Math.round(Date.now()/1000);
        let diff = now-date;
        let base = 20*60;
        let timer = base - diff;
        let chrono = [];
        chrono[0] = Math.ceil(timer/60);
        chrono[1] = timer%60;
        if(chrono[1] == 0){
            chrono[0]++;
        }
        
        userInfo(chrono[0], chrono[1]);
        user.saveData();
  
    }
    else{
        return [0, 0];
    }
}

function setHour(date){
    date = [date.getUTCMinutes(), date.getUTCSeconds()];
    return date;
}