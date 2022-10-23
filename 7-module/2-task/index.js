import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  modal = null;
  constructor() {
    this.modal = this.#render();
  }

  #render() {
    let modal = createElement(`<div class="modal">
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title"></h3>
      </div>
      <div class="modal__body"></div>
    </div>
  </div>`);
    return modal;
  }

  open() {
    document.body.appendChild(this.modal);
    document.body.classList.add("is-modal-open");
    this.modal.querySelector(".modal__close").addEventListener("click", this.close);
    document.addEventListener("keydown", this.closeByEsc);
  }

  close(){
    if (document.body.querySelector(".modal")) {
      document.body.querySelector(".modal").remove();
      document.body.classList.remove("is-modal-open");
      document.removeEventListener("keydown", this.close);
    }
  }

  closeByEsc(event) {
    if (event.code === "Escape") {
      document.removeEventListener("keydown", this.close);
      if (document.body.querySelector(".modal")) {
        document.body.querySelector(".modal").remove();
        document.body.classList.remove("is-modal-open");
      }
    }
  }

  setTitle(title) {
    let mainTitle = this.modal.querySelector(".modal__title");
    mainTitle.textContent = title;
    return this.modal;
  }

  setBody(div) {
    let mainModalBody = this.modal.querySelector(".modal__body");
    mainModalBody.innerHTML = "";
    mainModalBody.appendChild(div);
    return this.modal;
  }
}
