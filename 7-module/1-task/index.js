import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  elem = null;
  constructor(categories) {
    this.categories = categories;
    this.elem = this.#render();
  }

  #render() {
    let ribbon = document.createElement("div");
    ribbon.classList.add("ribbon");

    let ribbonInner = document.createElement("nav");
    ribbonInner.classList.add("ribbon__inner");

    let ribbonItem = null;

    ribbonInner.addEventListener("scroll", () => {
      let clientWidth = ribbonInner.clientWidth;
      let scrollWidth = ribbonInner.scrollWidth;

      let scrollLeft = ribbonInner.scrollLeft;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft === 0) {
        leftButton.classList.remove("ribbon__arrow_visible");
      }
      else{
        leftButton.classList.add("ribbon__arrow_visible");
      }

      if (scrollRight === 0) {
        rightButton.classList.remove("ribbon__arrow_visible");
      } else {
        rightButton.classList.add("ribbon__arrow_visible");
      }
    });

    let leftButton =
      createElement(`<button class="ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>`);
    leftButton.addEventListener("click", () => {
      ribbonInner.scrollBy(-350, 0);
    });

    let rightButton =
      createElement(`<button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>`);
    rightButton.addEventListener("click", () => {
      ribbonInner.scrollBy(350, 0);
    });

    this.categories.forEach((element) => {
      let eventCustom = new CustomEvent("ribbon-select", {
        detail: element.id,
        bubbles: true,
      });

      ribbonItem = createElement(
        `<a href="#" class="ribbon__item" data-id="${element.id}">${element.name}</a>`
      );
      ribbonItem.addEventListener("click", function (event) {
        event.preventDefault();
        for (let item of ribbonInner.querySelectorAll(".ribbon__item")) {
          item.classList.remove("ribbon__item_active");
        }
        this.classList.add("ribbon__item_active");

        ribbon.dispatchEvent(eventCustom);
      });
      ribbonInner.append(ribbonItem);
    });

    ribbon.append(leftButton);
    ribbon.append(ribbonInner);
    ribbon.append(rightButton);

    return ribbon;
  }
}
