import Carousel from "../../6-module/3-task/index.js";
import slides from "../../6-module/3-task/slides.js";

import RibbonMenu from "../../7-module/1-task/index.js";
import categories from "../../7-module/1-task/categories.js";

import StepSlider from "../../7-module/4-task/index.js";
import ProductsGrid from "../../8-module/2-task/index.js";

import CartIcon from "../../8-module/1-task/index.js";
import Cart from "../../8-module/4-task/index.js";

export default class Main {
  constructor() {
    this.products = null;
    this.data = null;
  }

  async render() {
    this.products = await fetch("products.json");
    this.data = await this.products.json();
    this.#pageRender();
  }

  #pageRender() {
    this.carousel = new Carousel(slides);
    document.querySelector("[data-carousel-holder]").append(this.carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    document.querySelector("[data-ribbon-holder]").append(this.ribbonMenu.elem);

    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3,
    });
    document.querySelector("[data-slider-holder]").append(this.stepSlider.elem);

    let cartIconHolder = document.querySelector("[data-cart-icon-holder]");
    this.cartIcon = new CartIcon();
    cartIconHolder.append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);

    this.productsGrid = new ProductsGrid(this.data);
    document.querySelector("[data-products-grid-holder]").innerHTML = "";
    document
      .querySelector("[data-products-grid-holder]")
      .append(this.productsGrid.elem);

      
    this.#addEventListener();
  }

  #addEventListener() {
    document.body.addEventListener("product-add", ({ detail: id }) => {
      let productId = this.data.find((item) => item.id == id);
      this.cart.addProduct(productId);
    });

    this.stepSlider.elem.addEventListener(
      "slider-change",
      ({ detail: value }) => {
        this.productsGrid.updateFilter({
          maxSpiciness: value,
        });
      }
    );

    this.ribbonMenu.elem.addEventListener("ribbon-select", ({ detail: id }) => {
      this.productsGrid.updateFilter({
        category: id,
      });
    });

    document
      .getElementById("nuts-checkbox")
      .addEventListener("change", (event) => {
        this.productsGrid.updateFilter({
          noNuts: event.target.checked,
        });
      });

    document
      .getElementById("vegeterian-checkbox")
      .addEventListener("change", (event) => {
        this.productsGrid.updateFilter({
          vegeterianOnly: event.target.checked,
        });
      });
  }
}
