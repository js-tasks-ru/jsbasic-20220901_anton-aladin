function initCarousel() {
  const leftArrow = document.querySelector(".carousel__arrow_left");
  const rightArrow = document.querySelector(".carousel__arrow_right");
  let sliderWrapper = document.querySelector(".carousel__inner");
  let slideElems = document.querySelectorAll(".carousel__slide");
  let slideCounter = 1;
  let slideWidth = null;
  leftArrow.style.display = 'none';

  leftArrow.addEventListener("click", () => {
    slideCounter--;
    slideWidth -= slideElems[slideCounter-1].querySelector(".carousel__img").offsetWidth;
    if (slideCounter <= 1) {
      leftArrow.style.display = 'none';
      slideCounter = 1;
      slideWidth -= 0;
    }
    else{
      leftArrow.style.display = '';
      rightArrow.style.display = '';
    }
    sliderWrapper.style.transform = `translateX(-${slideWidth+'px'})`;
  });

  rightArrow.addEventListener("click", () => {
    slideCounter++;
    slideWidth += slideElems[slideCounter-1].querySelector(".carousel__img").offsetWidth;
    if (slideCounter >= slideElems.length) {
      rightArrow.style.display = 'none';
      slideCounter = slideElems.length;
      slideWidth += 0;
    }
    else{
      leftArrow.style.display = '';
      rightArrow.style.display = '';
    }
    sliderWrapper.style.transform = `translateX(-${slideWidth+'px'})`;
  });

}
