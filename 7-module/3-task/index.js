import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  elem = null;
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.#render();
    this.elem.addEventListener("click", (event) => this.#changePosition(event));
    this.segmentSlider = steps - 1;
    this.stepCollection = this.elem.querySelectorAll('.slider__steps span');
    this.stepCollection[this.value].classList.add('slider__step-active');
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

  #changePosition(e) {
    this.value = Math.round(this.segmentSlider * ((e.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth));
    let position = (this.value / this.segmentSlider) * 100;
    this.elem.querySelector('.slider__thumb').style.left = `${position}%`;
    this.elem.querySelector('.slider__progress').style.width = `${position}%`;
    this.elem.querySelector('.slider__value').textContent = this.value;

    this.stepCollection.forEach(element => {
      element.classList.remove('slider__step-active');
    });
    this.stepCollection[this.value].classList.add('slider__step-active');

    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      })
    );
  }
}
