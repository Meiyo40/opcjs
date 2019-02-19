"use strict";

let slides = ['assets/diapo/diapo1.png','assets/diapo/diapo2.png','assets/diapo/diapo3.png'];
let descriptions = ["<strong>Tutoriel etape 1:</strong> Choisissez une des stations disponible",
                    "<strong>Tutoriel etape 2:</strong> Saisissez votre nom et votre prenom, puis cliquez sur 'Reserver'.",
                    "<strong>Tutoriel etape 3:</strong> Signez le formulaire, si tout est en ordre, vous verrez une fenetre confirmant la validation apparaître, attention, la réservation n'est valable que 20 min."];
let slider = new Slider(slides ,descriptions);

let timerAnimation;
let autoTimer = setInterval(Carousel, 5000);
Carousel();

//NEW VERSION
function Slider (slides, descriptions){
    this.slides = slides;
    this.descriptions = descriptions;
    this.currentSlide = 0;
}


function add(){
    if(slider.currentSlide < (slider.slides.length-1)){
        slider.currentSlide++;
    }
    else{
        slider.currentSlide = 0;
    }
    Carousel();
}

function less(){
    if(slider.currentSlide > 0){
        slider.currentSlide--;
    }
    else{
        slider.currentSlide = slider.slides.length-1;
    }
    Carousel();
}

function Carousel(active = true, position = 0){
    let carousel = document.getElementById('slide');
    let slideWindow = document.getElementById('diaporama');
    let description = document.getElementById('description');
    let width = slideWindow.offsetWidth;
    let pos = position;
    carousel.src = slider.slides[slider.currentSlide];
    description.innerHTML = slider.descriptions[slider.currentSlide];
    carousel.classList.add('animate');
    carousel.style.marginLeft = pos;
    clearInterval(autoTimer);
    if(active){
        timerAnimation = setInterval(moveRight, 5);
        function moveRight(){
            if(pos > slideWindow.offsetWidth){
                clearInterval(timerAnimation);
                slider.currentSlide++;
                carousel.setAttribute('style', 'opacity: 0');
                if(slider.currentSlide > (slider.slides.length - 1)){
                    slider.currentSlide = 0;
                }
                Carousel();
            }
            else if(pos == 0){
                clearInterval(timerAnimation);
                autoTimer = setInterval(function(){
                    Carousel(1, 1);
                }, 5000);
            }
            else{
                console.log('Adding: ' + pos);
                pos+=4;
                carousel.style.marginLeft = pos + 'px';
            }
        }
    }
    else{     
    }
}

function pause(){
    clearInterval(autoTimer);
    clearInterval(timerAnimation);
    Carousel(false);
    var simpleTimer = setTimeout(function(){
        autoTimer = setInterval(Carousel, 5000);
    }, 20000);
}