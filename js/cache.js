//STORAGE SYSTEM
//Si on a deja un utilisateur qui a été enregistré, on recupere tout et on recrée l'objet.

function Cache() {
    //check if cache exist
    this.user;
    this.reservation;
    this.canvasObj;
    this.getCache = () => {
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

            reservName.value = tempUser.name;
            reservFirstName.value = tempUser.firstname;

            canvasObj = new CanvasObj;
            canvasObj.signature_validation = tempUser.signatureValidation;
            user.signatureValidation = tempUser.signatureValidation;
            
            this.user = user;
            this.userExist();
        }
        if(localStorage.getItem('reservation')){
            reservation = new Reservation();
            toggleInfo = new UserInfo();
            toggleInfo.userObj = user;
            toggleInfo.reservObj = reservation;
            toggleInfo.UpdateUserInfo();
        }
    }
    this.delete = () => {
        localStorage.removeItem('reservation');
    }
    //Work with data  if user exist
    this.userExist = () => {
        if(typeof this.user != "undefined"){
            let reserveBtn = document.getElementById('reserve-btn');
            let canvasForm = document.getElementById('signature-form');
            let formPad = document.getElementById('UserForm');
            canvasForm.setAttribute('style', 'display: block');
            reserveBtn.setAttribute('style', 'display: none');
            formPad.setAttribute('style', 'height: auto');

            if(user.signature != null){
                let img = new Image;
                img.src = this.user.signature;
                img.onload = function (){
                    canvasObj.context.drawImage(img, 0, 0);
                };
            }

            if(this.user.dateReservation != null){
                let userTS = Date.parse(this.user.dateReservation);
                let limitTimer = 20*60*1000; //20min
                let now = Date.now();
                if((now - userTS) > limitTimer){
                    this.user.resetData();
                }
            }

            else{
                let message = document.getElementById('reservNone');
                let oldMessage = document.getElementById('reservOK');
                message.setAttribute('style', 'display: block');
                oldMessage.setAttribute('style', 'display: none');
            }
        }
    }
//ENDOBJECT
}