export default class Cart {
  cartItems = []; // [product: {...}, count: N]


  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) return;

    let cartItem = this.cartItems.find(item => item.product.id === product.id);

    if (!cartItem) {
      cartItem = {
        product,
        count: 1
      };
      this.cartItems.push(cartItem);
    } else {
      cartItem.count++;
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => item.product.id == productId);
    if (cartItem) {
      if (productId === cartItem.product.id) {
        cartItem.count += amount;
        if (cartItem.count <= 0) {
          this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
        }
      }
    }
    else{
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
    this.cartItems.forEach(item => {
      if (item.count > 0) {
        summprice += item.product.price * item.count;
      }
    });
    return summprice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче
    this.cartIcon.update(this);
  }
}

