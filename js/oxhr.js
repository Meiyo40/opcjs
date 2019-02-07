//Recup donnees API
var apiKey = '14b9693cd22171c820eebfa713292d3ab49e6222';
var items = ["stations", "contracts"];
var jcdAPI = "https://api.jcdecaux.com/vls/v1/" + items[0] + "?apiKey=" + apiKey;

function ajaxGet(url) {
    var oXhr = new XMLHttpRequest();
    oXhr.onload = function () {
        var data = JSON.parse(this.responseText);
        console.log('retour : ', data);
    };
    oXhr.onerror = function (data) {
        console.log('Erreur ...');
    };
    oXhr.open('GET', url, true);
    oXhr.send(null);
}

ajaxGet(jcdAPI);
