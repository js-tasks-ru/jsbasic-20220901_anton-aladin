import createElement from "../../assets/lib/create-element.js";
import escapeHtml from "../../assets/lib/escape-html.js";

import Modal from "../../7-module/2-task/index.js";

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) return;

    let cartItem = this.cartItems.find(
      (item) => item.product.id === product.id
    );

    if (!cartItem) {
      cartItem = {
        product,
        count: 1,
      };
      this.cartItems.push(cartItem);
    } else {
      cartItem.count++;
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find((item) => item.product.id == productId);
    if (cartItem) {
      if (productId === cartItem.product.id) {
        cartItem.count += amount;
        if (cartItem.count <= 0) {
          this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
        }
      }
    } else {
      return;
    }
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, item) => sum + item.count, 0);
  }

  getTotalPrice() {
    let summprice = null;
    this.cartItems.forEach((item) => {
      if (item.count > 0) {
        summprice += item.product.price * item.count;
      }
    });
    return summprice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle("Your order");
    this.modalWrapper = createElement("<div></div>");
    this.cartItems.forEach((item) => {
      this.modalWrapper.append(this.renderProduct(item.product, item.count));
    });
    this.modalWrapper.append(this.renderOrderForm());

    this.modalWrapper
      .querySelector(".cart-form")
      .addEventListener("submit", (event) => {
        event.preventDefault;
        this.onSubmit(event);
      });

    this.modal.setBody(this.modalWrapper);
    this.modal.open();
    this.modalWrapper
      .querySelector(".cart-form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        this.onSubmit();
      });
    this.modalWrapper.addEventListener("click", (event) => {
      if (event.target.closest(".cart-counter__button_minus")) {
        this.updateProductCount(
          event.target.closest(".cart-product").dataset.productId,
          -1
        );
      }
      if (event.target.closest(".cart-counter__button_plus")) {
        this.updateProductCount(
          event.target.closest(".cart-product").dataset.productId,
          1
        );
      }
    });
  }

  onProductUpdate(cartItem) {
    if (document.body.classList.contains("is-modal-open")) {
      let productId = cartItem.product.id;
      let modalBody = document.querySelector(".modal__body");
      let productCount = modalBody.querySelector(
        `[data-product-id="${productId}"] .cart-counter__count`
      );
      let productPrice = modalBody.querySelector(
        `[data-product-id="${productId}"] .cart-product__price`
      );
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);
      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${(
        cartItem.product.price * cartItem.count
      ).toFixed(2)}`;

      if (cartItem.count) {
        infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
      }
      if (!this.getTotalPrice()) {
        this.modal.close();
      }
    }
    this.cartIcon.update(this);
  }

  onSubmit() {
    document.querySelector(`[type='submit']`).classList.add('is-loading');

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(document.querySelector('form')),
    }).then( (response) => {
      if(response.ok){
        this.modal.setTitle('Success!');
        this.cartItems = [];
        const modalBody = document.querySelector('.modal__body');
        modalBody.innerHTML = `<div class="modal__body-inner"><p>Order successful! Your order is being cooked :) <br>We’ll notify you about delivery time shortly.<br><img src="/assets/images/delivery.gif"></p></div>`;
      }
    });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
