"use strict";

let slides = ['assets/diapo/diapo1.jpg',
              'assets/diapo/diapo2.jpg',
              'assets/diapo/diapo3.jpg', 
              'assets/diapo/diapo4.jpg'];
let descriptions = ["<strong>Tutoriel étape 1/3:</strong> Choisissez une des stations disponible",
                    "<strong>Tutoriel étape 2/3:</strong> Saisissez votre <strong>Nom</strong> et votre <strong>Prénom</strong>, puis cliquez sur 'Réservation'.",
                    "<strong>Tutoriel étape 3/3:</strong> Signez le formulaire, si tout est en ordre, vous verrez une fenetre confirmant la réservation apparaître, attention, la réservation n'est valable que 20 min.",
                   "<strong>Profitez maintenant de votre réservation !</strong>"];
let slider = new Slider(slides ,descriptions);
let moving = false;
let timerAnimation;
let autoTimer = isMobile() ? null : setInterval(Slider.sliderControl, 5000);
slider.sliderControl();

//NEW VERSION
function Slider (slides, descriptions){
    this.slides = slides;
    this.descriptions = descriptions;
    this.currentSlide = 0;
    
    this.sliderControl = function (active = true, position = 0, immediate = null){
        let slide = document.getElementById('slide');
        let carouselContainer = document.getElementById('carousel');
        let figure = document.getElementById('slide_container');
        let slideWindow = document.getElementById('diaporama');
        let description = document.getElementById('description');
        let width = slideWindow.offsetWidth;
        let pos = position;
        slide.src = slider.slides[slider.currentSlide];
        figure.style.left = '0';
        slide.classList.add('animate');
        description.innerHTML = slider.descriptions[slider.currentSlide];
        slide.style.marginLeft = pos;
        clearInterval(autoTimer);

        //ADAPT CONTAINER SIZE TO FIGURE SIZE
        let height = figure.offsetHeight;
        carouselContainer.style.height = height + 30 + 'px';



        if(!isMobile()){
            if(active){
                timerAnimation = setInterval(moveRight, 5);
                function moveRight(){
                    if(pos > slideWindow.offsetWidth){
                        clearInterval(timerAnimation);
                        slider.currentSlide++;
                        if(slider.currentSlide > (slider.slides.length - 1)){
                            slider.currentSlide = 0;
                        }
                        slide.classList.remove('animate');
                        slider.sliderControl();
                    }
                    else if(pos == 0){
                        moving = false;
                        clearInterval(timerAnimation);
                        initTimer();
                    }
                    else{
                        pos+=4;
                        figure.style.left = pos + 'px';
                        moving = true;
                    }
                }
            }
            else{
                if(immediate == 'next'){
                    clearInterval(timerAnimation);
                    slider.currentSlide++;

                    if(slider.currentSlide > (slider.slides.length - 1)){
                        slider.currentSlide = 0;
                    }

                    figure.style.left = 0;
                    moving = false;
                    slider.sliderControl();
                }
                else if (immediate == 'previous'){
                    clearInterval(timerAnimation);
                    slider.currentSlide--;
                    if(slider.currentSlide < 0){
                        slider.currentSlide = slider.slides.length-1;
                    }

                    figure.style.left = 0;
                    moving = false;
                    slider.sliderControl();

                }
            }
        }
    }
//endObject
}

//If the media is too small we saw a mobile and disable the auto slide
function isMobile(){
    if(document.documentElement.clientWidth < 480){
        return true;
    }
    else{
        return false;
    }
}

function initTimer(){
    autoTimer = setInterval(function(){
        slider.sliderControl(1,1);
    }, 5000);
}


//GOTO the next slide
function add(){
    if(!moving){
        if(slider.currentSlide < (slider.slides.length-1)){
            slider.currentSlide++;
        }
        else{
            slider.currentSlide = 0;
        }
        clearInterval(autoTimer);
        slider.sliderControl(false);
        autoTimer = setInterval(slider.sliderControl, 5000);
    }
    else{
        slider.sliderControl(false, 0, 'next');
    }
}

//GOTO the previous slide
function less(){
    if(!moving){
        if(slider.currentSlide > 0){
            slider.currentSlide--;
        }
        else{
            slider.currentSlide = slider.slides.length-1;
        }
        clearInterval(autoTimer);
        slider.sliderControl(false);
        autoTimer = setInterval(slider.sliderControl, 5000);
    }
    else{
        slider.sliderControl(false, 0, 'previous');
    }
}

//PAUSE slider for 25sec
function pause(){
    clearInterval(autoTimer);
    clearInterval(timerAnimation);
    slider.sliderControl(false);
    var simpleTimer = setTimeout(function(){
        autoTimer = setInterval(Slider.sliderControl, 5000);
    }, 20000);
}

