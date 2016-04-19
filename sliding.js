Sliding = function(options) {
	this.frame = options.frame;
	this.container = options.container;
	this.slideClass = options.slideClass;
	this.btnClass = options.btnClass;
	this.slides = [];
	this.activeSlideIndex = 0;
	this.currentTransform = 0;
	this.init();
};

Sliding.prototype.init = function() {
	this.width = this.frame.offsetWidth;
	this.getSlides();
	this.getButtons();
	var width = this.width * (this.slides.length);
	this.container.style.width = width + 'px';
	this.listen();

};

Sliding.prototype.listen = function() {

	this.rightBtn.addEventListener('click', function() {
		this.slideRight.call(this);
	}.bind(this));

	this.leftBtn.addEventListener('click', function() {
		this.slideLeft.call(this);
	}.bind(this));

};

Sliding.prototype.getSlides = function() {
	var slides = document.getElementsByClassName(this.slideClass);
	for(var i = 0; i < slides.length; i++) {
		slides[i].style.width = this.width + 'px';
		this.slides.push(slides[i]);
	}
};

Sliding.prototype.getButtons = function() {
	var buttons = document.getElementsByClassName(this.btnClass);
	for(var i = 0; i < buttons.length; i++) {
		if (buttons[i].dataset.slideDirection === 'left') {
			this.leftBtn = buttons[i];
		} else if (buttons[i].dataset.slideDirection === 'right') {
			this.rightBtn = buttons[i];
		}
	}
};

Sliding.prototype.setToStart = function() {
	this.currentTransform = 0;
	this.activeSlideIndex = 0;
};

Sliding.prototype.setToEnd = function() {
	this.currentTransform = this.width * (this.slides.length - 1);
	this.activeSlideIndex = this.slides.length - 1;
};

Sliding.prototype.slideRight = function() {
	if (this.activeSlideIndex >= this.slides.length - 1) {
		this.setToStart();
	} else {
		this.currentTransform = this.currentTransform + this.width;
		this.activeSlideIndex = this.activeSlideIndex + 1;
	}
	this.slide();
};

Sliding.prototype.slideLeft = function() {
	if (this.activeSlideIndex === 0) {
		this.setToEnd();
	} else {
		this.currentTransform = this.currentTransform - this.width;
		this.activeSlideIndex = this.activeSlideIndex - 1;
	}
	this.slide();
};

Sliding.prototype.slide = function() {
	this.container.style.transform = 'translate(-'+this.currentTransform+'px)';
};