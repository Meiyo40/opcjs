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

function ajaxGet(url, Map) {
    var oXhr = getXMLHttpRequest();

    oXhr.onerror = function (data) {
        console.log('Erreur... ');
    };

    oXhr.open("GET", url, true);
    oXhr.responseType = 'json';
    oXhr.send();

    oXhr.onload = function () {
        let setStation = new Station(this.response[0]);
        setStation.setStations(this.response, Map);
    }
}

