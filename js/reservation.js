//Reservation OBJECT
function Reservation (){
    this.basicTimer = 19;
    this.startTimer = false;
    this.userAccess = document.getElementById('userAccess');
    this.oldMessage = document.getElementById('reservOK');
    this.message = document.getElementById('reservNone');
    this.canvasObj;
    this.resaStation;
    
    this.onCreate = () => {
         
        this.userName = document.getElementById('name');
        this.userFirstName = document.getElementById('firstname');
        this.img = document.getElementById('signature-pad');
        this.urlIMG = this.img.toDataURL();
        this.resaStation = document.getElementById('nameStation').placeholder;
        this.available_bike = document.getElementById('velo');

        user = new User(this.userName.value, this.userFirstName.value, Date.now(), this.resaStation, this.urlIMG);
        user.signatureValidation = this.canvasObj.signature_validation;
        
        toggleInfo = new UserInfo; 
        localStorage.setItem('userInfo', toggleInfo);
        
        toggleInfo.UpdateUserInfo(user.timer[0], user.timer[1], user, this); //On edit la partie pour les informations
        user.saveData();
        
        
        //Offline trick for simulate a real reservation on station panel
        this.save();
        this.updatePanel();
        
        
        this.message.setAttribute('style', 'display: none');
        this.oldMessage.setAttribute('style', 'display: block');
    }
    
    this.updatePanel = () => {
        let resaCheck = JSON.parse(localStorage.getItem('reservation'));
        console.log(this.resaStation);
        if(resaCheck.resaStation == this.resaStation){
            this.available_bike.placeholder = parseInt(this.available_bike.placeholder) + " (1 resa)";
        }
        else{
            this.available_bike.placeholder = (parseInt(this.available_bike.placeholder) -1 ) + " (1 resa)";
        }
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
        this.message.setAttribute('style', 'display: block');
        this.oldMessage.setAttribute('style', 'display: none');
        this.userAccess.setAttribute('style', 'display: none');
        
        userObj.timer = [this.basicTimer, 60];
        userObj.dateReservation = null;
        userObj.saveData();
        
        alert('Votre réservation n\'est plus valable !');
        window.location.reload();
    }
}

