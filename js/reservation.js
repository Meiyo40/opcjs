var timer;
//var startTimer = false;

//OBJECT USER INFO ABOUT RESERVATION STATUS
function UserInfo(min, scd, userObj, reservObj){
	this.stationName = user.station;
    this.resaName = user.name + ' ' + user.firstname;
    this.stationUI = document.getElementById('stationName');
    this.nameUI = document.getElementById('userName');
    this.minuteUI = document.getElementById('minute');
    this.secondeUI = document.getElementById('seconde');
	this.userAccess = document.getElementById('userAccess');
    this.userAccessBtn = document.getElementById('userAccessBtn');
    this.minAccess = document.getElementById('minAccess');
    this.scdAccess = document.getElementById('scdAccess');
    this.userObj = user;
    this.reservObj = reservation;
	this.min = min;
    this.scd = scd;
	
	userUI.setAttribute('style', 'display: block;');
    
    this.stationUI.textContent = this.stationName;
    this.nameUI.textContent = this.resaName;
	
	//Cette fonction gere l'affichage du  bouton d'information et d'acces rapide en haut de page
    this.userAccessInfo = () => {
        this.minuteUI.textContent = this.min;
        if(this.scd < 10){
            this.secondeUI.textContent = "0" + this.scd;
        }
        else{
            this.secondeUI.textContent = this.scd;
        }
        
        this.minAccess.textContent = this.min;
        if(this.scd < 10){
            this.scdAccess.textContent = "0" + this.scd;
        }
        else{
            this.scdAccess.textContent = this.scd;
        }
        
        if(this.userObj.dateReservation != null){
            if(this.userObj.timer[0] >= 10){
                this.userAccess.setAttribute('style', 'background-color: green; display: block');
            }
            else if((this.userObj.timer[0] < 12) && (this.userObj.timer[0] >=7)){
                this.userAccess.setAttribute('style', 'background-color: yellow; color: black; display: block');
            }
            else if((this.userObj.timer[0] < 7)&&(this.userObj.timer[0] > 3)){
                this.userAccess.setAttribute('style', 'background-color: orange; display: block');
            }
            else{
                this.userAccess.setAttribute('style', 'background-color: red; display: block;');
            }
        }
        
    }
    
    this.startInterval = () => {
    timer = setInterval(() => toggleInfo.diffHour(user, reservation), 1000);
    }
	
	//Cette fonction gère l'affichage du curseur sur la timeline
    this.timeline = () => {
        const max = 1200;
        //On recupere les secondes du timer user
        let stamp = (user.timer[0]*60) + user.timer[1];
        let timelineCursor = document.getElementById('timeline-cursor');
        
        stamp = Number.parseFloat((stamp/1200)*100).toFixed(2);
        let cursorPos = (99-stamp) + '%';
        timelineCursor.style.left = cursorPos;
    }
    
    this.diffHour = (userObj, reservObj) => {
        //[min, scd]
        if(reservObj.startTimer && userObj.dateReservation != null){
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
                this.userAccessInfo(0, 0);
            }
            else{
                this.UpdateUserInfo(chrono[0], chrono[1]);
            }
            this.userObj.saveData();  
        }
        else{
            return [0, 0];
            console.log('Erreur...');
        }
    }
    
    this.UpdateUserInfo = (min, scd) => {
        if (!this.startTimer){
            this.reservObj.startTimer = true;
            clearInterval(timer);
            this.startInterval();
        }
        
        this.min = min;
        this.scd = scd;
        this.timeline();
        this.userAccessInfo();   
    }
	
	//endobject
}

//USER OBJECT
function User(name, firstname, date, station, signature, remainingTime = [reservation.basicTimer, 60]){
    this.name = name;
    this.firstname = firstname;
    this.dateReservation = date;
    this.station = station;
    this.signature = signature;
    this.timer = remainingTime;
    this.signatureValidation;
    
    this.saveData = function (){
        localStorage.setItem('user', JSON.stringify(this));
    }

    this.timestampRefresh = function (){
        let now = Date.now();
    }
}
//Reservation OBJECT
function Reservation (){
    this.basicTimer = 19;
    this.startTimer = false;
    
    this.onCreate = () => {
         
        this.userName = document.getElementById('name');
        this.userFirstName = document.getElementById('firstname');
        this.img = document.getElementById('signature-pad');
        this.urlIMG = this.img.toDataURL();
        this.resaStation = document.getElementById('nameStation').placeholder;
        this.available_bike = document.getElementById('velo');

        user = new User(this.userName.value, this.userFirstName.value, Date.now(), this.resaStation, this.urlIMG);
        user.signatureValidation = canvasObj.signature_validation;
        
        toggleInfo = new UserInfo; 
        localStorage.setItem('userInfo', toggleInfo);
        
        toggleInfo.UpdateUserInfo(user.timer[0], user.timer[1], user, this); //On edit la partie pour les informations
        user.saveData();
        
        
        //Offline trick for simulate a real reservation on station panel
        this.available_bike.placeholder = (parseInt(this.available_bike.placeholder) -1 ) + " (1 resa)";
        
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
        canvasObj.clear_canvas(userObj); 
        
        sessionStorage.removeItem('signature');
        clearInterval(timer);
        this.startTimer = false;
        
        //see let declarations at the start of signature.js
        message.setAttribute('style', 'display: block');
        oldMessage.setAttribute('style', 'display: none');
        userAccess.setAttribute('style', 'display: none');
        
        userObj.timer = [this.basicTimer, 60];
        userObj.dateReservation = null;
        userObj.saveData();
        
        alert('Votre réservation n\'est plus valable !');
        window.location.reload();
    }
}

