//GLOBAL VAR
var stations = [];
//SET MAP
function Map(name, coord, mapid) {
    this.name = name;
    this.coord = coord;
    this.mapid = mapid;
    this.myMap = L.map(this.mapid).setView(this.coord, 15);

    this.initMap = function () {
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoibWVpeW8iLCJhIjoiY2pxcmp2bGMzMGxvajQ2bjJwbHJuZWQzMyJ9.INZjlfp6WqLeajKxCsKCgg'
        }).addTo(this.myMap);
    }
}
//OBJ STATION
function Station(data) {

    this.name = data.name;
    this.address = data.address;
    this.coord = [data.position.lat, data.position.lng];
    
    this.setMarker = function () {
        //IconStyle
        var Available = L.icon({
            iconUrl: 'assets/Cycling_Location.png',
            iconSize: [39,60],
            iconAnchor: [37,59],
            popupAnchor: [-18,-56]
        });
        var notAvailable = L.icon({
            iconUrl: 'assets/Cycling_Location_empty.png',
            iconSize: [39,60],
            iconAnchor: [37,59],
            popupAnchor: [-18,-56]
        });
        //createMarker
        if(data.available_bikes > 0){
           var marker = new L.marker([this.coord[0], this.coord[1]], {icon: Available}).addTo(newMap.myMap);
           }
        else{
           var marker = new L.marker([this.coord[0], this.coord[1]], {icon: notAvailable}).addTo(newMap.myMap);
           }
        //Show popup with station name
        marker.bindPopup('<strong>Station:</strong><br>' + this.name).openPopup();
        marker.on('click', function(){
            console.log(data.name);
            document.getElementById('name').placeholder = data.name;
            document.getElementById('address').placeholder = data.address;
            document.getElementById('velo').placeholder = data.available_bikes;
            document.getElementById('place').placeholder = data.bike_stands;
        })
    }
}

function setStation(Alldata) {

    for (let i = 0; i < Alldata.length; i++) {
        stations[i] = new Station(Alldata[i]);
        stations[i].setMarker();
        //if an user exist, we set previous data
        if(localStorage.getItem('user')){
            let tempUser = JSON.parse(localStorage.getItem('user'));
            if(Alldata[i].name == user.station){
                document.getElementById('name').placeholder = Alldata[i].name;
                document.getElementById('address').placeholder = Alldata[i].address;
                document.getElementById('velo').placeholder = (Alldata[i].available_bikes-1) + ' (1 Resa)';
                document.getElementById('place').placeholder = Alldata[i].bike_stands;
            }
        }
    }
}
//CREATE TOULOUSE MAP
var newMap = new Map('Toulouse', [43.604348, 1.443409], 'mapid');
newMap.initMap();





function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
}

//newMap.myMap.on('click', onMapClick);


//END JQUERY FUNCTION