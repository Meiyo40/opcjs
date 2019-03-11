//STORAGE SYSTEM
//Si on a deja un utilisateur qui a été enregistré, on recupere tout et on recrée l'objet.
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
    
    canvasObj = new CanvasObj;
}
if(localStorage.getItem('reservation')){
    let tempReservation = JSON.parse(localStorage.getItem('reservation'));
    reservation = new Reservation();
    toggleInfo = new UserInfo();
    toggleInfo.userObj = user;
    toggleInfo.reservObj = reservation;
    toggleInfo.UpdateUserInfo();
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
            canvasObj.context.drawImage(img, 0, 0);
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
