import View from './View';
import icons from 'url:../../icons/icons.svg';
import detailsPage from '../../../public/details.html';
import { formatPrice } from '../helpers';

class ResultView extends View {
  _parentElement = '';

  _generateMarkup() {
    return /*html*/ `
      <a
        href="${detailsPage}&id=${this._data.id}"
        class="product__card relative flex flex-col overflow-hidden rounded-lg shadow-customSm transition duration-300 hover:shadow-lg"
      >
        <figure class="relative h-48 sm:h-52 xl:h-44 w-full overflow-hidden xl:w-full">
          <img
            src="${this._data.image}"
            alt="${this._data.name}"
            class="absolute inset-0 h-full w-full object-cover object-center transition duration-300 hover:scale-105"
          />
        </figure>
        <div class="flex flex-col">
          <div class="px-6 pb-8 pt-6">
            <span
              class="mb-3 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-500"
              >${this._data.brand}</span
            >
            <h4 class="mb-2 border-b pb-3 text-base font-bold uppercase text-neutral-600">
              ${this._data.name}
            </h4>
            <div class="mt-4 flex items-center justify-between">
              <div class="flex items-baseline space-x-1 text-amber-500">
                <p class="text-lg font-medium">${formatPrice(this._data.price)}</p>
              </div>
              <div class="flex items-center space-x-3">
                <button class="icon h-6 w-6" aria-label="Add to Wishlist">
                  <svg class="h-5 w-5 fill-current">
                    <use xlink:href="${icons}#icon-wishlist"></use>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </a>
    `;
  }
}

export default new ResultView();
