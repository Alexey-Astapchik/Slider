// const slideOffset = 500;
const defaultSettings = {
    slideWidth: 300,
    slideHeight: '',
    maxSlides: 2,
    autoplay: false,
    timeout: 1000,
    navs: true
};

let moveNum = 0;

let customSlider = document.querySelector('.custom_slider');


customSlider.customSlider = function (sliderSettings = {}) {

    const slideOffset = sliderSettings.slideWidth || defaultSettings.slideWidth;
    const height = sliderSettings.slideHeight || defaultSettings.slideHeight;
    const maxSlides = sliderSettings.maxSlides || defaultSettings.maxSlides;
    const autoplay = sliderSettings.autoplay || defaultSettings.autoplay;
    const timeout = sliderSettings.timeout || defaultSettings.timeout;
    const navs = sliderSettings.navs || defaultSettings.navs;
    const slidesNumber = customSlider.querySelectorAll('div');
    const lengthTotal = slidesNumber.length * slideOffset;

    createSlider(slideOffset, height, slidesNumber);

    let outerContainer = customSlider.querySelector('.outer-container');
    outerContainer.style.width = `${slideOffset * maxSlides}px`;


    let nextSlide = document.querySelector('.custom_slider .next');
    let prevSlide = document.querySelector('.custom_slider .prev');

    nextSlide.addEventListener('click', nextClick);
    prevSlide.addEventListener('click', prevClick);


    function nextClick() {
        let customSlider = this.closest('.custom_slider');
        let innerContainer = customSlider.querySelector('.inner-container');
        console.log(moveNum)
        if ((moveNum - slideOffset) > -lengthTotal) {
            moveNum = moveNum - slideOffset;
            innerContainer.style.transform = `translate(${moveNum}px, 0)`;
        }
    }

    function prevClick() {
        let customSlider = this.closest('.custom_slider');
        let innerContainer = customSlider.querySelector('.inner-container');
        console.log(moveNum)
        if (moveNum < 0) {
            moveNum = moveNum + slideOffset;
            innerContainer.style.transform = `translate(${moveNum}px, 0)`;
        }
    }

    function autoplaySlider() {
        let innerContainer = customSlider.querySelector('.inner-container');
        if (autoplay) {
            if ((moveNum - slideOffset) > -lengthTotal) {
                moveNum = moveNum - slideOffset;
                innerContainer.style.transform = `translate(${moveNum}px, 0)`;
                if((moveNum - slideOffset) <= -lengthTotal){
                    moveNum = slideOffset;
                    innerContainer.style.transform = `translate(${moveNum}px, 0)`;
                }
                if (navs) {
                    const navsEl = document.querySelectorAll('.navs');
                    navsEl.forEach(item => {
                        item.remove();
                    });
                }
            }
            
        }

    }
    autoplaySlider();

    function autoLoop() {
        setInterval(autoplaySlider, timeout);
    }
    window.onload = autoLoop;
};


function createSlider(slideWidth, slideHeight, slidesNumber) {

    slidesNumber.forEach(item => {
        item.classList.add('one-slide');
        item.style.width = `${slideWidth}px`;
        item.style.height = `${slideHeight}px`;
    });

    customSlider.innerHTML = `
    <div class="outer-container">
        <div class="inner-container">
            ${customSlider.innerHTML}
        </div>
      </div>
      <div class="navs">
          <a href="#" class="prev"><</a>
          <a href="#" class="next">></a>
      </div>
    `;
}