"use strict";


let currentDiv = 1;
let carouselTimer = setInterval(carouselAuto, 5000);
let visibility = 1;
let carouselFadeOut;
let carouselFadeIn;

function plusDivs(div = 1){
    let old = currentDiv;
    currentDiv += div;
    if(currentDiv > 3){
        currentDiv = 1;
    }
    else if(currentDiv < 1){
        currentDiv = 3;
    }

    let newSlide = "slide" + currentDiv;
    let oldSlide = "slide" + old;
    newSlide = document.getElementById(newSlide);
    newSlide.setAttribute('style','display: block');
    oldSlide = document.getElementById(oldSlide);
    oldSlide.setAttribute('style','display: none');
    
}

function carouselAuto(){
    let div = 1;
    let old = currentDiv;
    currentDiv += div;
    if(currentDiv > 3){
        currentDiv = 1;
    }
    else if(currentDiv < 1){
        currentDiv = 3;
    }
    carouselFadeOut = setInterval(function(){ fadeOut(currentDiv, old )}, 100);
}

function pause(){
    clearInterval(carouselTimer);
    var simpleTimer = setTimeout(function(){
        carouselTimer = setInterval(carouselAuto, 5000);
    }, 20000);
}

function fadeIn(currentDiv){
    let newSlide = "slide" + currentDiv;
    newSlide = document.getElementById(newSlide);
    
    if((visibility <= 1) && (visibility >= 0)){
        visibility += 0.10;
    }
    newSlide.style.opacity = visibility;
    if (visibility > 1){
        newSlide.style.opacity = 1;
        clearInterval(carouselFadeIn);
        visibility = 1;
        return;
    }
    
    
    
    
}

function fadeOut(currentDiv, old){
    let oldSlide = "slide" + old;
    oldSlide = document.getElementById(oldSlide);
    
    if(visibility > 0){
        visibility -= 0.10;
    }
    
    oldSlide.style.opacity = visibility;
    
    if(visibility < 0){
        let newSlide = "slide" + currentDiv;
        newSlide = document.getElementById(newSlide);
        setTimeout(null,10);
        oldSlide.setAttribute('style','display: none');
        newSlide.setAttribute('style','display: block; opacity: 0;');
        carouselFadeIn = setInterval(function(){ fadeIn(currentDiv)}, 100);
        clearInterval(carouselFadeOut);
        visibility = 0;
        return;
    }
}