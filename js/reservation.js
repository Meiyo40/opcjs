//Reservation OBJECT
function Reservation (){
    this.basicTimer = 19;
    this.startTimer = false;
    this.userAccess = document.getElementById('userAccess');
    this.oldMessage = document.getElementById('reservOK');
    this.message = document.getElementById('reservNone');
    this.canvasObj = canvasObj;
    this.resaStation;
    this.cache = cache;
    
    this.onCreate = () => {
         
        this.userName = document.getElementById('name');
        this.userFirstName = document.getElementById('firstname');
        this.img = document.getElementById('signature-pad');
        this.urlIMG = this.img.toDataURL();
        this.resaStation = document.getElementById('nameStation').placeholder;
        this.available_bike = document.getElementById('velo');

        user = new User(this.userName.value, this.userFirstName.value, Date.now(), this.resaStation, this.urlIMG);
        user.signatureValidation = this.canvasObj.signature_validation;
        this.cache.user = user;
        this.cache.canvasObj = this.canvasObj;
        
        toggleInfo = new UserInfo; 
        localStorage.setItem('userInfo', toggleInfo);
        
        toggleInfo.UpdateUserInfo(user.timer[0], user.timer[1], user, this); //On edit la partie pour les informations
        user.saveData();
        
        
        //Offline trick for simulate a real reservation on station panel
        this.save();
        this.cache.userExist();
        this.updatePanel();
        
        
        this.message.setAttribute('style', 'display: none');
        this.oldMessage.setAttribute('style', 'display: block');
    }
    
    this.updatePanel = () => {
        if(this.available_bike.placeholder.indexOf("Resa")>0){
            this.available_bike.placeholder = parseInt(this.available_bike.placeholder) + " (1 Resa)";
            
        }
        else{
            this.available_bike.placeholder = (parseInt(this.available_bike.placeholder) -1 ) + " (1 Resa)";
        }
    }
    
    
    this.save = () => {
        sessionStorage.setItem('signature', this.urlIMG);
        sessionStorage.setItem('station', this.resaStation);
        localStorage.setItem('reservation', JSON.stringify(this));
    }
    
    this.reset = (userObj) =>{
        
        
        this.canvasObj.clear_canvas(userObj); 
        
        sessionStorage.removeItem('signature');
        clearInterval(timer);
        this.startTimer = false;
        
        this.message.setAttribute('style', 'display: block');
        this.oldMessage.setAttribute('style', 'display: none');
        this.userAccess.setAttribute('style', 'display: none');
        userObj.timer = [this.basicTimer, 60];
        userObj.dateReservation = null;
        userObj.saveData();
        
        alert('Votre réservation n\'est plus valable !');
        this.cache.delete();
        window.location.reload();
    }
}

