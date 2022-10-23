import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  elem = null;
  constructor(slides) {
    this.slides = slides;
    this.elem = this.#render();
  }

  #render() {
    let sliderData = document.createElement("div");
    sliderData.classList.add("carousel");
    let sliderWrapper = document.createElement("div");
    sliderWrapper.classList.add("carousel__inner");
    let slider = null;
    let slideCounter = 1;
    let slideWidth = null;

    let button = `<button type="button" class="carousel__button">
      <img src="/assets/images/icons/plus-icon.svg" alt="icon">
    </button>`;

    let rightArrow =
      createElement(`<div class="carousel__arrow carousel__arrow_right">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>`);
    let leftArrow =
      createElement(`<div class="carousel__arrow carousel__arrow_left">
    <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>`);

    leftArrow.style.display = "none";

    leftArrow.addEventListener("click", () => {
      let slideElems = document.querySelectorAll(".carousel__slide");
      slideCounter--;
      slideWidth -=
        slideElems[slideCounter - 1].querySelector(
          ".carousel__img"
        ).offsetWidth;
      if (slideCounter <= 1) {
        leftArrow.style.display = "none";
        slideCounter = 1;
        slideWidth -= 0;
      } else {
        leftArrow.style.display = "";
        rightArrow.style.display = "";
      }
      sliderWrapper.style.transform = `translateX(-${slideWidth + "px"})`;
    });

    rightArrow.addEventListener("click", () => {
      let slideElems = document.querySelectorAll(".carousel__slide");
      slideCounter++;
      slideWidth +=
        slideElems[slideCounter - 1].querySelector(
          ".carousel__img"
        ).offsetWidth;
      if (slideCounter >= slideElems.length) {
        rightArrow.style.display = "none";
        slideCounter = slideElems.length;
        slideWidth += 0;
      } else {
        leftArrow.style.display = "";
        rightArrow.style.display = "";
      }
      sliderWrapper.style.transform = `translateX(-${slideWidth + "px"})`;
    });

    sliderData.append(rightArrow);
    sliderData.append(leftArrow);

    this.slides.forEach((slide) => {
      slider =
        createElement(`<div class="carousel__slide" data-id="penang-shrimp">
    <img src="/assets/images/carousel/${
      slide.image
    }" class="carousel__img" alt="slide">
    <div class="carousel__caption">
      <span class="carousel__price">€${slide.price.toFixed(2)}</span>
      <div class="carousel__title">${slide.name}</div>
      ${button}
    </div>
  </div>`);
      let event = new CustomEvent("product-add", {
        detail: slide.id,
        bubbles: true,
      });
      slider
        .querySelector(".carousel__button")
        .addEventListener("click", () => {
          sliderData.dispatchEvent(event);
        });
      sliderWrapper.append(slider);
    });
    sliderData.append(sliderWrapper);
    return sliderData;
  }
}
