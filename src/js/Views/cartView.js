import View from './View';
import icons from 'url:../../icons/icons.svg';
import { formatPrice } from '../helpers';

class CartView extends View {
  _parentElement = document.querySelector('.cart__content');
  _errorMessage = 'No items in your cart. Find a product and add it!';

  addHandlerRender(handler) {
    window.addEventListener('load', function (e) {
      handler();
    });
  }

  addHandlerUpdateQuantity(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn__update-quantity');

      if (!btn) return;
      e.preventDefault();

      const { quantity } = btn.dataset;
      const { id } = btn.dataset;

      if (+quantity > 0) handler(+quantity, id);
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

  _generateMarkup() {
    const cartTotal = this._data
      .map(item => item.price * item.quantity)
      .reduce((accumulator, current) => (accumulator += current), 0);

    return `
      <div class="cart__items">
        ${this._data.map(item => this._generateCartItem(item)).join('')}
      </div>
      <div class="cart__total mt-16 px-6">
        <p class="font-medium text-right text-xl">Total: ${formatPrice(cartTotal)}</p>
      </div>
    `;
  }

  _generateCartItem(item) {
    const { id, name, price, image, color, quantity } = item;

    return /*html*/ `
      <article class="border-b border-neutral-100 last:border-0">
        <a href="/details.html?id=${id.split('#')[0]}" class="flex py-4 px-6 hover:bg-neutral-50 xs:flex-col">
          <figure class="h-16 flex-[0_0_64px] xs:h-32 xs:flex-none rounded-sm overflow-hidden">
            <img src="${image}" alt="${name}" class="w-full h-full object-cover object-center">
          </figure>
          <div class="ml-4 flex-1 flex overflow-hidden xs:ml-0 xs:mt-3">
            <div class="cart__details">
              <span
              class="block max-w-xs leading-none mb-2 overflow-hidden text-ellipsis whitespace-nowrap font-semibold uppercase tracking-wide text-neutral-700">
                ${name}
              </span>
              <div class="my-2 grid grid-cols-[80px_auto] text-xs space-x-4">
                <div class="flex items-center">
                  <span class="text-neutral-600 font-semibold">${formatPrice(price * quantity)}</span>
                </div>
                <div class="flex items-center">
                  <span class="mr-2">Color: </span>
                  <span class="h-3 w-3 rounded-full" style="background-color: ${color}"></span>
                </div>
              </div>
              <div class="btn__remove-product text-xs uppercase font-medium text-red-500 transition duration-300 hover:text-red-600" data-id="${id}">
                Remove
              </div>
            </div>
            <div class="ml-auto">
              <div class="flex flex-col items-center gap-0.5">
                <button class="btn__control btn__update-quantity bg-transparent h-6 w-6" data-quantity="${
                  quantity + 1
                }" data-id="${id}">
                  <svg class="h-full w-full fill-current">
                    <use xlink:href="${icons}#icon-arrow-up"></use>
                  </svg>
                </button>
                <span class="cart__quantity text-base font-semibold text-neutral-600">${quantity}</span>
                <button class="btn__control btn__update-quantity bg-transparent h-6 w-6" data-quantity="${
                  quantity - 1
                }" data-id="${id}">
                  <svg class="h-full w-full fill-current">
                    <use xlink:href="${icons}#icon-arrow-down"></use>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </a>
      </article>
    `;
  }
}

export default new CartView();
