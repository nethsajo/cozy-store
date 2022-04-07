class MenuView {
  _btnMenu = document.querySelector('.btn__menu');
  _menuContainer = document.querySelector('.menu__container');
  _btnMenuClose = document.querySelector('.btn__menu-close');

  _btnCart = document.querySelector('.btn__cart');
  _cartContainer = document.querySelector('.cart__container');
  _btnCartClose = document.querySelector('.btn__cart-close');

  constructor() {
    //Menu
    this._addShowMenu();
    this._addHideMenu();

    //Cart
    this._addShowCart();
    this._addHideCart();
  }

  toggleMenu(type) {
    this._menuContainer.classList[type === 'open' ? 'remove' : 'add']('-translate-x-full');
  }

  _addShowMenu() {
    this._btnMenu.addEventListener('click', this.toggleMenu.bind(this, 'open'));
  }

  _addHideMenu() {
    this._btnMenuClose.addEventListener('click', this.toggleMenu.bind(this, 'close'));
  }

  toggleCart(type) {
    this._cartContainer.classList[type === 'open' ? 'remove' : 'add']('translate-x-full');
  }

  _addShowCart() {
    this._btnCart.addEventListener('click', this.toggleCart.bind(this, 'open'));
  }

  _addHideCart() {
    this._btnCartClose.addEventListener('click', this.toggleCart.bind(this, 'close'));
  }
}

export default new MenuView();
