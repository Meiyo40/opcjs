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