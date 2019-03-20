"use strict";



//SLIDER OBJECT
function Slider (slides, descriptions){
    this.slides = slides;
    this.descriptions = descriptions;
    this.currentSlide = 0;
    this.oldSlide = 0;
    this.slideContainer = document.getElementById('slide');
    this.carouselContainer = document.getElementById('carousel');
    this.figure = document.getElementById('slide_container');
    this.slideWindow = document.getElementById('diaporama');
    this.description = document.getElementById('description');
    this.width = this.slideWindow.offsetWidth;
    this.btnAction = false;
    this.btnPrevious = document.getElementById('previous');
    this.btnNext = document.getElementById('next');
    this.btnPause = document.getElementById('pause');
    
    
    
    this.sliderControl = () => {
        if(this.slides != undefined){     
            this.slideContainer.src = this.slides[this.currentSlide];
            this.description.innerHTML = this.descriptions[this.currentSlide];
            if(!this.btnAction){
                this.fade();
            }
            
            clearInterval(this.autoTimer);
            this.size();
            
            if(!this.isMobile() && !this.btnAction){
                this.initTimer();
            }
            else if(!this.isMobile() && this.btnAction){
                this.initTimer();
                this.btnAction = false;
            }
        }
    }
    
    this.fade = function(){
        this.slideContainer.style.opacity = 0;
        $('.diapo').animate({opacity: 1}, 700);
    }
    
    //ADAPT CONTAINER SIZE TO FIGURE SIZE
    this.size = () => {
        let height = this.figure.offsetHeight;
        this.carouselContainer.style.height = height + 30 + 'px';
    }
    //currentSlide must be in the range of slides.length
    this.range = function (index){
        if(index == (+1)){
            if(this.currentSlide < (this.slides.length-1)){
                this.currentSlide++;
            }
            else{
                this.currentSlide = 0;
            }
        }
        else if(index == (-1)){
            if(this.currentSlide > 0){
                this.currentSlide--;
            }
            else{
                this.currentSlide = this.slides.length-1;
            }
        }
        else{
            console.log('error slide index..');
        }
    }
    
    //If the media is too small we saw a mobile and disable the auto slide
    this.isMobile = function(){
        if(document.documentElement.clientWidth < 480){
            return true;
        }
        else{
            return false;
        }
    }
    
    this.initTimer = function(that = this){
        clearInterval(that.autoTimer);
        that.btnAction = false;

        that.autoTimer = setInterval(function(){
            that.range(+1);
            that.sliderControl();
        }, 5000);
    }
    this.autoTimer = this.isMobile() ? null : setInterval(this.sliderControl, 5000);
    //DEBUGLINE?
    this.sizeTimer = setInterval(this.size, 500);
    
    this.next = () => {
        this.range(+1);
        this.btnAction = true;
        clearInterval(this.autoTimer);
        this.sliderControl();
    }
    
    this.previous = () => {
        this.range(-1);
        this.btnAction = true;
        clearInterval(this.autoTimer);
        this.sliderControl();
    }
    
    this.pause = () => {
        clearInterval(this.autoTimer);
    }
    
    this.EventListener = () => {
        document.addEventListener('keydown', (e) => {
            const key = e.key;
            if(key === 'ArrowRight'){
                this.next();
            }
            else if(key === 'ArrowLeft'){
                this.previous();
            }
        }, false);
        
        this.btnNext.onclick = () => this.next();
        this.btnPause.onclick = () => this.pause();
        this.btnPrevious.onclick = () => this.previous();
    }
    
   
}

//endObject
