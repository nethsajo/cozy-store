import View from './View';
import icons from 'url:../../icons/icons.svg';

class CartView extends View {
  _parentElement = document.querySelector('.cart__items');

  addHandlerRender(handler) {
    window.addEventListener('load', function (e) {
      handler();
    });
  }

  _generateMarkup() {
    return this._data.map(item => this._generateCartItem(item)).join('');
  }

  _generateCartItem(item) {
    const { id, name, image, color } = item;
    const link = id.split('#')[0];

    return /*html*/ `
      <article class="border-b border-neutral-100 last:border-0">
        <a href="/details.html?id=${link}" class="flex py-4 px-6 hover:bg-neutral-50 xs:flex-col">
          <figure class="h-16 flex-[0_0_64px] rounded-sm xs:h-20 xs:flex-none">
            <img src="${image}" alt="" class="w-full h-full object-cover object-center">
          </figure>
          <div class="ml-4 flex-1 overflow-hidden xs:ml-0 xs:mt-3">
            <span
              class="block max-w-xs overflow-hidden text-ellipsis whitespace-nowrap font-medium uppercase tracking-wide text-neutral-600">
              ${name}
            </span>
            <div class="mt-1 flex items-center text-xs mb-4">
              <span class="mr-2">Color: </span>
              <span class="h-3 w-3 rounded-full" style="background-color: ${color}"></span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <button class="btn__control h-6 w-6">
                  <svg class="h-4 w-4 fill-current">
                    <use xlink:href="${icons}#icon-add"></use>
                  </svg>
                </button>
                <span class="text-base font-semibold text-neutral-600">1</span>
                <button class="btn__control h-6 w-6">
                  <svg class="h-4 w-4 fill-current">
                    <use xlink:href="${icons}#icon-minus"></use>
                  </svg>
                </button>
              </div>
              <button class="ml-auto self-center text-red-500 transition duration-300 hover:text-red-600" data-id="${id}">
                <svg class="h-5 w-5 fill-current">
                  <use xlink:href="${icons}#icon-trash"></use>
                </svg>
              </button>
            </div>
          </div>
        </a>
      </article>
    `;
  }
}

export default new CartView();
