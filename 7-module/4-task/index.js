import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  elem = null;
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.#render();
    this.elem.addEventListener("click", (event) => this.#clickPosition(event));
    this.segmentSlider = steps - 1;
    this.stepCollection = this.elem.querySelectorAll(".slider__steps span");
    this.stepCollection[0].classList.add("slider__step-active");
    this.thumb = this.elem.querySelector(".slider__thumb");
    this.thumb.ondragstart = () => false;
    this.#dragEvents();
  }

  #render() {
    let slider = createElement(`
    <div class="slider">
      <div class="slider__thumb" style="left:0">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress" style="width:0"></div>
      <div class="slider__steps">
        ${"<span></span>".repeat(this.steps)}
      </div>
    </div>`);
    return slider;
  }

  #clickPosition(e) {
    this.value = Math.round(
      this.segmentSlider *
        ((e.clientX - this.elem.getBoundingClientRect().left) /
          this.elem.offsetWidth)
    );
    let position = (this.value / this.segmentSlider) * 100;
    this.elem.querySelector(".slider__thumb").style.left = `${position}%`;
    this.elem.querySelector(".slider__progress").style.width = `${position}%`;
    this.elem.querySelector(".slider__value").textContent = this.value;

    this.stepCollection.forEach((element) => {
      element.classList.remove("slider__step-active");
    });
    this.stepCollection[this.value].classList.add("slider__step-active");

    this.elem.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true,
      })
    );
  }

  #dragEvents() {
    this.thumb.addEventListener('pointerdown', this.pointerdown);
    this.thumb.addEventListener('pointerup', this.pointerup);
  }

  pointerdown = () => {
    this.thumb.addEventListener('pointermove', this.pointermove);
    this.elem.classList.add('slider_dragging');
  }

  pointerup = () => {
    this.thumb.removeEventListener('pointermove', this.pointermove);
    this.elem.classList.remove('slider_dragging');

    this.elem.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true,
      })
    );
  }

  pointermove = (event) =>{
    this.value = Math.round(
      this.segmentSlider *
        ((event.clientX - this.elem.getBoundingClientRect().left) /
          this.elem.offsetWidth)
    );

    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    let leftPercents = leftRelative * 100;

    this.elem.querySelector(".slider__thumb").style.left = `${leftPercents}%`;
    this.elem.querySelector(".slider__progress").style.width = `${leftPercents}%`;
    this.elem.querySelector(".slider__value").textContent = this.value;

  }

}
