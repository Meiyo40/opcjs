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
    console.log(pos);
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


//let currentDiv = 1;
////let carouselTimer = setInterval(carouselAuto, 5000);
//let visibility = 1;
//let carouselFadeOut;
//let carouselFadeIn;
//
//function plusDivs(div = 1){
//    let old = currentDiv;
//    currentDiv += div;
//    if(currentDiv > 3){
//        currentDiv = 1;
//    }
//    else if(currentDiv < 1){
//        currentDiv = 3;
//    }
//
//    let newSlide = "slide" + currentDiv;
//    let oldSlide = "slide" + old;
//    newSlide = document.getElementById(newSlide);
//    newSlide.setAttribute('style','display: block');
//    oldSlide = document.getElementById(oldSlide);
//    oldSlide.setAttribute('style','display: none');
//    
//}
//
//function carouselAuto(){
//    let div = 1;
//    let old = currentDiv;
//    currentDiv += div;
//    if(currentDiv > 3){
//        currentDiv = 1;
//    }
//    else if(currentDiv < 1){
//        currentDiv = 3;
//    }
//    carouselFadeOut = setInterval(function(){ fadeOut(currentDiv, old )}, 100);
//}
//
//function pause(){
//    clearInterval(carouselTimer);
//    var simpleTimer = setTimeout(function(){
//        carouselTimer = setInterval(carouselAuto, 5000);
//    }, 20000);
//}
//
//function fadeIn(currentDiv){
//    let newSlide = "slide" + currentDiv;
//    newSlide = document.getElementById(newSlide);
//    
//    if((visibility <= 1) && (visibility >= 0)){
//        visibility += 0.10;
//    }
//    newSlide.style.opacity = visibility;
//    if (visibility > 1){
//        newSlide.style.opacity = 1;
//        clearInterval(carouselFadeIn);
//        visibility = 1;
//        return;
//    }
//    
//    
//    
//    
//}
//
//function fadeOut(currentDiv, old){
//    let oldSlide = "slide" + old;
//    oldSlide = document.getElementById(oldSlide);
//    
//    if(visibility > 0){
//        visibility -= 0.10;
//    }
//    
//    oldSlide.style.opacity = visibility;
//    
//    if(visibility < 0){
//        let newSlide = "slide" + currentDiv;
//        newSlide = document.getElementById(newSlide);
//        setTimeout(null,10);
//        oldSlide.setAttribute('style','display: none');
//        newSlide.setAttribute('style','display: block; opacity: 0;');
//        carouselFadeIn = setInterval(function(){ fadeIn(currentDiv)}, 100);
//        clearInterval(carouselFadeOut);
//        visibility = 0;
//        return;
//    }
//}