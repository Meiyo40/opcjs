//CANVAS DISPLAY
let reserveBtn = document.getElementById('reserve-btn');
let canvasForm = document.getElementById('signature-form');
let formPad = document.getElementById('UserForm');

reserveBtn.onclick = function (){
    canvasForm.setAttribute('style', 'display: block'); 
    reserveBtn.setAttribute('style', 'display: none');
    formPad.setAttribute('style', 'height: 620px');
};

$(document).ready(function() {
	
	// Variables :
	let color = "#000";
	let painting = false;
	let started = false;
	let width_brush = 5;
	let canvas = $("#signature-pad");
	let cursorX, cursorY;
	let context = canvas[0].getContext('2d');
	
    
    
	canvas.mousedown(function(e) {
        // Click souris enfoncé sur le canvas, je dessine :
		painting = true;
		// Coordonnées de la souris :
		cursorX = (e.pageX - this.offsetLeft);
		cursorY = (e.pageY - this.offsetTop);
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
			cursorX = (e.pageX - this.offsetLeft) - 10; // 10 = décalage du curseur
			cursorY = (e.pageY - this.offsetTop) - 10;
			
			// Dessine une ligne :
			drawLine();
		}
	});
	
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
			context.lineWidth = 3;
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
	$("#save").click(function() {
		let canvas_tmp = document.getElementById("canvas");
		window.location = canvas_tmp.toDataURL("image/png");
	});
	
});