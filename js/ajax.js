
//Recup donnees API
var apiKey = '14b9693cd22171c820eebfa713292d3ab49e6222';
var jcdAPI = "https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=" + apiKey;
var Alldata = [];


function storeData(data) {
    for (let i = 0; i < data.length; i++) {
        Alldata.push(data[i]);
    }

    setStation(Alldata);
}

function getXMLHttpRequest() {
    let xhr = null;
    if (window.XMLHttpRequest || window.ActiveXObject) {
        if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("Msxm12.XMLHTTP");
            } catch (e) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        } else {
            xhr = new XMLHttpRequest();
        }
    } else {
        alert("Votre navigateur ne supporte pas l'objet XMLHttpRequest");
        return null;
    }
    return xhr;
}

function ajaxGet(url) {
    var oXhr = getXMLHttpRequest();

    oXhr.onerror = function (data) {
        console.log('Erreur... ');
    };

    oXhr.open("GET", url, true);
    oXhr.responseType = 'json';
    oXhr.send();

    oXhr.onload = function () {
        storeData(this.response);
    }
}

ajaxGet(jcdAPI);