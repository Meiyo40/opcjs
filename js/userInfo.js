function CanvasObj() {
	this.color = "#000";
	this.painting = false;
	this.started = false;
	this.width_brush = 2;
	this.signature_validation = 0;
	this.canvas = document.querySelector('#signature-pad');
	this.cursorX, cursorY;
	this.context = canvas.getContext('2d');
	this.paintWindow = document.querySelector('#canvas-container');
	this.windowStyle = getComputedStyle(paintWindow);
	
	//Ajuste la taille du canvas a son container, JS oblige pour éviter des soucis avec les coords de la souris
	this.context.canvas.width = parseInt(windowStyle.getPropertyValue('width'));
	this.context.canvas.height = parseInt(windowStyle.getPropertyValue('height'));
	
	this.canvas.addEventListener("touchstart", onmousedown, false);
	this.canvas.addEventListener("touchmove", onmousemove, true);
	this.canvas.addEventListener("touchend", onmouseup, false);
	document.body.addEventListener("touchcancel", onmouseup, false);
	
	this.canvas.addEventListener("mousedown", function (e) {
		// Click souris enfoncé sur le canvas, je dessine :
		this.painting = true;
		// Coordonnées de la souris :
		this.cursorX = (e.pageX - this.canvas.offsetLeft);
		this.cursorY = (e.pageY - this.canvas.offsetTop);
		this.paint();
	});
	// Relachement du Click arrête de dessiner :
	this.canvas.addEventListener("mouseup", function () {
		this.painting = false;
		this.started = false;
	});
	// Mouvement de la souris sur le canvas :
	this.canvas.addEventListener("mousemove", function (e) {
		// Si je suis en train de dessiner (click souris enfoncé) :
		if (painting) {
			// Set Coordonnées de la souris :
			this.cursorX = (e.pageX - this.canvas.offsetLeft);
			this.cursorY = (e.pageY - this.canvas.offsetTop);
				// Dessine une ligne :
			this.drawLine();
		}
	});
	
	this.canvas.addEventListener('touchstart', function(e){
		let coord = this.getTouchPos(this.canvas, e);
		this.cursorX = coord.x;
		this.cursorY = coord.y;
		
		this.paint();
	});

	this.canvas.addEventListener("touchend", function (e) {
	  var mouseEvent = new MouseEvent("mouseup", {});
	  this.canvas.dispatchEvent(mouseEvent);
	});

	this.canvas.addEventListener('touchmove', function(e){
		let coord = this.getTouchPos(this.canvas, e);
		this.cursorX = coord.x;
		this.cursorY = coord.y;
		
		this.drawLine();
	});
	
	this.canvas.addEventListener("touchstart",  function(event) {event.preventDefault()})
	this.canvas.addEventListener("touchmove",   function(event) {event.preventDefault()})
	this.canvas.addEventListener("touchend",    function(event) {event.preventDefault()})
	this.canvas.addEventListener("touchcancel", function(event) {event.preventDefault()})
	
	this.getTouchPos = (canvasDom, touchEvent) => {
	  var rect = canvasDom.getBoundingClientRect();
	  return {
		x: touchEvent.touches[0].clientX - rect.left,
		y: touchEvent.touches[0].clientY - rect.top
	  };
	}
	this.canvasSaveState = () => {
		this.context.save();
	}
	this.paint = () => {
		this.context.stroke();
	}
	// Fonction qui dessine une ligne :
	this.drawLine = () => {
		// Si c'est le début, j'initialise
		if (!this.started) {
			// Je place mon curseur pour la première fois :
			this.context.beginPath();
			this.context.moveTo(cursorX, cursorY);
			this.started = true;
		}
		// Sinon je dessine
		else {
			this.context.lineTo(cursorX, cursorY);
			this.context.strokeStyle = color;
			this.context.lineWidth = width_brush;
			this.context.stroke();
			this.signature_validation += 1;
		}
	}

	// Clear du Canvas :
	this.clear_canvas = (userObj) => {
		this.context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		this.context.beginPath();
		this.context.restore();

		this.signature_validation = 0;
		
		this.userObj.signatureValidation = 0;
		this.userObj.signature = null;
	}

}