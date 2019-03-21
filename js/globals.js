var cache;
var user;
var timer;
var reservation;
var toggleInfo;
var canvasObj;

let slider = new Slider(['assets/diapo/diapo1.jpg',
                        'assets/diapo/diapo2.jpg',
                        'assets/diapo/diapo3.jpg', 
                        'assets/diapo/diapo4.jpg'],
                    ["<strong>Tutoriel étape 1/3:</strong> Choisissez une des stations disponible",
                    "<strong>Tutoriel étape 2/3:</strong> Saisissez votre <strong>Nom</strong> et votre <strong>Prénom</strong>, puis cliquez sur 'Réservation'.",
                    "<strong>Tutoriel étape 3/3:</strong> Signez le formulaire, si tout est en ordre, vous verrez une fenetre confirmant la réservation apparaître, attention, la réservation n'est valable que 20 min.",
                   "<strong>Profitez maintenant de votre réservation !</strong>"]
);

slider.sliderControl();
slider.sizeTimer;
slider.EventListener();
slider.autoTimer;

cache = new Cache();
canvasObj = new CanvasObj();
cache.getCache();



//CREATE TOULOUSE MAP
var newMap = new Map('Toulouse', [43.604348, 1.443409], 'mapid');
newMap.initMap();


//Recup donnees API
var jcdAPI = "https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=14b9693cd22171c820eebfa713292d3ab49e6222";
var Alldata = [];

ajaxGet(jcdAPI, newMap);