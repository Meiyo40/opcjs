//CANVAS DISPLAY + BUTTON BEHAVIOR
let reserveBtn = document.getElementById('reserve-btn');
let canvasForm = document.getElementById('signature-form');
let formPad = document.getElementById('UserForm');
let cancelBtn = document.getElementById('cancel');
let saveBtn = document.getElementById('save');
let userUI = document.getElementById('user-information');
reserveBtn.onclick = function (){
    let availableBike = parseInt(document.getElementById('velo').placeholder);
    if( availableBike > 0){
        canvasForm.setAttribute('style', 'display: block'); 
        reserveBtn.setAttribute('style', 'display: none');
        formPad.setAttribute('style', 'height: auto');
    }
    else{
        alert('Cette station ne dispose de pas velo disponible, merci de choisir une autre station');
    }
    
};

cancelBtn.onclick = function(){
    canvasForm.setAttribute('style', 'display: none');
    reserveBtn.setAttribute('style', 'display: block margin: 0 auto');
    formPad.setAttribute('style', 'height: 480px');
}

saveBtn.onclick = function(){
    
    user.savedHour = ((Date.now() % (24 * 60 * 60 * 1000)) - (new Date().getTimezoneOffset() * 60 * 1000)); // on sauvegarde l'heure de l'enregistrement en format milliseconde pour la comparaison du chrono
    userUI.setAttribute('style', 'display: block'); 
    let img = document.getElementById('signature-pad');
    let urlIMG = img.toDataURL();
    let resaStation = document.getElementById('name').placeholder;
    
    sessionStorage.setItem('signature', urlIMG);
    sessionStorage.setItem('station', resaStation);
    userInfo(20, 00); //On edit la partie pour les informations
}



$(document).ready(function() {
	
	// Variables :
	let color = "#000";
	let painting = false;
	let started = false;
	let width_brush = 2;
	let canvas = $("#signature-pad");
	let cursorX, cursorY;
	let context = canvas[0].getContext('2d');
    let paintWindow = document.querySelector('#canvas-container');
    let windowStyle = getComputedStyle(paintWindow);
    //Ajuste la taille du canvas a son container, JS oblige pour éviter des soucis avec les coords de la souris
    context.canvas.width = parseInt(windowStyle.getPropertyValue('width'));
    context.canvas.height = parseInt(windowStyle.getPropertyValue('height'));
	
    
    
	canvas.mousedown(function(e) {
        // Click souris enfoncé sur le canvas, je dessine :
		painting = true;
		// Coordonnées de la souris :
		cursorX = (e.pageX - this.offsetLeft);
		cursorY = (e.pageY - this.offsetTop);
        paint();
	});
	
	// Relachement du Click arrête de dessiner :
	$(this).mouseup(function() {
		painting = false;
		started = false;
	});
	
	// Mouvement de la souris sur le canvas :
	canvas.mousemove(function(e) {
		// Si je suis en train de dessiner (click souris enfoncé) :
		if (painting) {
			// Set Coordonnées de la souris :
			cursorX = (e.pageX - this.offsetLeft); // 10 = décalage du curseur
			cursorY = (e.pageY - this.offsetTop);
			
			// Dessine une ligne :
			drawLine();
		}
	});
	function paint (){
        context.lineTo(cursorX, cursorY);
        context.stroke();
    }
	// Fonction qui dessine une ligne :
	function drawLine() {
		// Si c'est le début, j'initialise
		if (!started) {
			// Je place mon curseur pour la première fois :
			context.beginPath();
			context.moveTo(cursorX, cursorY);
			started = true;
		} 
		// Sinon je dessine
		else {
			context.lineTo(cursorX, cursorY);
			context.strokeStyle = color;
			context.lineWidth = width_brush;
			context.stroke();
		}
	}
    
	// Clear du Canvas :
	function clear_canvas() {
		context.clearRect(0,0, canvas.width(), canvas.height());
	}
	// Bouton Reset :
	$("#clear").click(function() {
		clear_canvas();		
	});
	
	// Bouton Save :
//	$("#save").click(function() {
//		let canvas_tmp = document.getElementById("canvas");
//		window.location = canvas_tmp.toDataURL("image/png");
//	});
	
});