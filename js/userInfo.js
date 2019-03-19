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
    this.cancelReservationBtn = document.getElementById('cancelReservation');
    this.minAccess = document.getElementById('minAccess');
    this.scdAccess = document.getElementById('scdAccess');
    this.userUI = document.getElementById('user-information');
    this.userObj = user;
    this.reservObj = reservation;
	this.min = min;
    this.scd = scd;
	
	this.userUI.setAttribute('style', 'display: block;');
    
    this.stationUI.textContent = this.stationName;
    this.nameUI.textContent = this.resaName;
	
    this.cancelReservationBtn.onclick = () => {
        if(window.confirm("Souhaitez vous réellement annuler votre réservation ?")){
            reservation.reset(user);
        }
    }
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
