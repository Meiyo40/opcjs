//jQuery(document).ready(function($){
//    
//    function to_image(){
//        var canvas = document.getElementById("signature-pad");
//        document.getElementById("theimage").src = canvas.toDataURL();
//        Canvas2Image.saveAsPNG(canvas);
//    }
//    
//    let canvas = document.getElementById("signature-pad");
//    let signaturePad = new SignaturePad(canvas);
//    let imgData = canvas.toDataURL();
//    
//
//    
//     
//    $('#clear').on('click', function(){
//        signaturePad.clear();
//    });
//});


$(document).ready(function() {
	
	// Variables :
	var color = "#000";
	var painting = false;
	var started = false;
	var width_brush = 5;
	var canvas = $("#signature-pad");
	var cursorX, cursorY;
	var restoreCanvasArray = [];
	var restoreCanvasIndex = 0;
	
	var context = canvas[0].getContext('2d');
	
    
    
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
		var canvas_tmp = document.getElementById("canvas");
		window.location = canvas_tmp.toDataURL("image/png");
	});
	
});