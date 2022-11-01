import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  elem = null;
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.list = [];
    this.prodGrid = createElement(`<div class="products-grid">
    <div class="products-grid__inner">   
    </div>
    </div>`);
    this.elem = this.#render();
  }

  #render(list = this.products){
    this.prodGrid.querySelector('.products-grid__inner').innerHTML = '';
    list.forEach(product => {
      let prodCard = new ProductCard(product);
      this.prodGrid.querySelector('.products-grid__inner').append(prodCard.elem);
    });
    return this.prodGrid;
  }

  updateFilter(filters){
    Object.assign(this.filters, filters);
    this.list = [];

    for (let product of this.products) {
      if (this.filters.noNuts && product.nuts) {continue;}
      if (this.filters.vegeterianOnly && !product.vegeterian) {continue;}
      if (this.filters.maxSpiciness !== undefined && product.spiciness > this.filters.maxSpiciness) {
        continue;
      }
      if (this.filters.category && product.category != this.filters.category) {
        continue;
      }
      this.list.push(product);
    }
    this.#render(this.list);
  }
}
