import icons from 'url:../../icons/icons.svg';
import { formatPrice } from '../helpers';
import View from './View';

class CartView extends View {
  _parentElement = document.querySelector('.cart__items');
  _cartCount = document.querySelector('.cart__count');
  _cartTotal = document.querySelector('.cart__total');
  _errorMessage = 'No items in your cart. Find a product and add to cart it!';

  addHandlerRender(handler) {
    window.addEventListener('load', function () {
      handler();
    });
  }

  addHandlerUpdateQuantity(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn__update-quantity');

      if (!btn) return;
      e.preventDefault();

      const { updateTo, id } = btn.dataset;

      if (+updateTo > 0) handler(+updateTo, id);
    });
  }

  addHandlerProductRemove(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn__remove-product');

      if (!btn) return;
      e.preventDefault();

      const { id } = btn.dataset;

      handler(id);
    });
  }

  addHandlerTotal(data) {
    //Total price in cart
    const cartTotal = data
      .map(item => item.price * item.quantity)
      .reduce((accumulator, current) => {
        return (accumulator += current);
      }, 0);

    this._cartTotal.textContent = formatPrice(cartTotal);

    //Total items in cart
    const cartItemsTotal = data.reduce((accumulator, current) => {
      return (accumulator += current.quantity);
    }, 0);

    this._cartCount.textContent = cartItemsTotal;
  }

  _generateMarkup() {
    return this._data.map(item => this._generateCartItem(item)).join('');
  }

  _generateCartItem(item) {
    const { id, name, price, image, color, quantity } = item;

    const sku = id.split('#')[0];

    const url = new URLSearchParams(window.location.search).get('id');

    return /*html*/ `
      <li class="cart__item border-b border-neutral-100 last:border-0">
        <div class="flex py-4 px-6 hover:bg-neutral-50 ${sku === url ? 'bg-neutral-50' : ''} xs:flex-col ltr">
          <figure class="h-16 flex-[0_0_64px] xs:h-32 xs:flex-none rounded-sm overflow-hidden">
            <img src="${image}" alt="${name}" class="w-full h-full object-cover object-center">
          </figure>
          <div class="ml-4 flex-1 flex overflow-hidden xs:ml-0 xs:mt-3 w-full">
            <div class="cart__details flex flex-col items-start">
              <h4
              class="max-w-xs leading-none mb-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold uppercase tracking-wide text-neutral-700">${name}</h4>
              <div class="my-2 grid grid-cols-[80px_auto] text-sm space-x-4">
                <div class="flex items-center">
                  <span class="text-neutral-600 font-semibold">${formatPrice(price * quantity)}</span>
                </div>
                <div class="flex items-center">
                  <span class="mr-2">Color: </span>
                  <span class="h-3 w-3 rounded-full" style="background-color: ${color}"></span>
                </div>
              </div>
              <span class="btn__remove-product text-xs uppercase font-medium text-red-500 transition duration-300 hover:text-red-600 cursor-pointer" data-id="${id}">
                Remove
              </span>
            </div>
            <div class="ml-auto">
              <div class="flex flex-col items-center gap-0.5">
                <button class="btn__control btn__update-quantity bg-transparent h-6 w-6" data-update-to="${
                  quantity + 1
                }" data-id="${id}">
                  <svg class="h-full w-full fill-current">
                    <use xlink:href="${icons}#icon-arrow-up"></use>
                  </svg>
                </button>
                <span class="cart__quantity text-base font-semibold text-neutral-600">${quantity}</span>
                <button class="btn__control btn__update-quantity bg-transparent h-6 w-6" data-update-to="${
                  quantity - 1
                }" data-id="${id}">
                  <svg class="h-full w-full fill-current">
                    <use xlink:href="${icons}#icon-arrow-down"></use>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
    `;
  }
}

export default new CartView();
