//STORAGE SYSTEM
//Si on a deja un utilisateur qui a été enregistré, on recupere tout et on recrée l'objet.
const basicTimer = 19;
var timer;
var startTimer = false;


//Cache system
if(localStorage.getItem('user')){
    let tempUser = JSON.parse(localStorage.getItem('user'));
    user = new User(tempUser.name, 
                    tempUser.firstname, 
                    tempUser.dateReservation, 
                    tempUser.station, 
                    tempUser.signature,
                    tempUser.timer
                   );
    
    let reservName = document.getElementById('name');
    let reservFirstName = document.getElementById('firstname');
    
    signature_validation = tempUser.signatureValidation;
    reservName.value = tempUser.name;
    reservFirstName.value = tempUser.firstname;
    userInfo();
}
if(localStorage.getItem('reservation')){
    let tempReservation = JSON.parse(localStorage.getItem('reservation'));
    reservation = new Reservation();
}




//Si un utilisateur existe (donc la reservation existe) et si la reservation est plus vielle que 20min, alors on reset!
if(typeof user != "undefined"){
    
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
    timer = setInterval(() => diffHour(user, reservation), 1000);
}

function userInfo(min, scd){
    let stationName = user.station;
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
    
    timeline();
    userAccess();   
}

//USER OBJECT
function User(name, firstname, date, station, signature, remainingTime = [basicTimer, 60]){
    this.name = name;
    this.firstname = firstname;
    this.dateReservation = date;
    this.station = station;
    this.signature = signature;
    this.timer = remainingTime;
    this.signatureValidation = signature_validation;
    
    this.saveData = function (){
        localStorage.setItem('user', JSON.stringify(this));
    }

    this.timestampRefresh = function (){
        let now = Date.now();
    }
}

function Reservation (){
    this.onCreate = () => {
         
        this.userName = document.getElementById('name');
        this.userFirstName = document.getElementById('firstname');
        this.img = document.getElementById('signature-pad');
        this.urlIMG = this.img.toDataURL();
        this.resaStation = document.getElementById('nameStation').placeholder;

        user = new User(this.userName.value, this.userFirstName.value, Date.now(), this.resaStation, this.urlIMG);
        
        
        userInfo(user.timer[0], user.timer[1]); //On edit la partie pour les informations
        user.saveData();
        
        this.save();
        
        message.setAttribute('style', 'display: none');
        oldMessage.setAttribute('style', 'display: block');
    }
    this.save = () => {
        sessionStorage.setItem('signature', this.urlIMG);
        sessionStorage.setItem('station', this.resaStation);
        localStorage.setItem('reservation', JSON.stringify(this));
    }
    
    this.reset = (userObj) =>{
        clear_canvas(userObj); 
        
        sessionStorage.removeItem('signature');
        clearInterval(timer);
        startTimer = false;
        
        //see let declarations at the start of signature.js
        message.setAttribute('style', 'display: block');
        oldMessage.setAttribute('style', 'display: none');
        userAccess.setAttribute('style', 'display: none');
        
        userObj.timer = [basicTimer, 60];
        userObj.dateReservation = null;
        userObj.saveData();
        
        alert('Votre réservation n\'est plus valable !');
        window.location.reload();
    }
}

function diffHour(userObj, reservObj){
    
    //[min, scd]
    if(startTimer && userObj.dateReservation != null){
        let date = Math.round(userObj.dateReservation/1000);
        let now = Math.round(Date.now()/1000);
        let diff = now-date;
        let base = 20*60;
        let timer = base - diff;
        let chrono = [];
        chrono[0] = Math.floor(timer/60);
        chrono[1] = timer%60;
        userObj.timer = chrono;
        if((chrono[0] <= 0)&&(chrono[1] <= 0)){
            reservObj.reset(userObj);
            userInfo(0, 0);
        }
        else{
            userInfo(chrono[0], chrono[1]);
        }
        userObj.saveData();  
    }
    else{
        return [0, 0];
        console.log('Erreur...');
    }
}