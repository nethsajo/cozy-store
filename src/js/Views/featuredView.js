import View from './Views';
import icons from 'url:../../icons/icons.svg';

class FeaturedView extends View {
  _parentElement = document.querySelector('.featured');
  _errorMessage = 'No products found!';

  renderError(message = this._errorMessage) {
    const markup = /*html*/ `
      <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <svg class="h-6 w-6 sm:h-8 sm:w-8 fill-red-600">
          <use xlink:href="${icons}#icon-warning"></use>
        </svg>
        <span class="text-xl text-neutral-600 font-medium sm:text-2xl xs:text-lg">${message}</span>
      </div>
    `;

    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    return /*html*/ `
      <div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:gap-12">
        ${this._data.map(product => this._generateFeaturedProducts(product)).join('')}
      </div>    
    `;
  }

  _generateFeaturedProducts(product) {
    const { id, name, brand, price, image } = product;
    return /*html*/ `
      <a
        href="./pages/details.html?id=${id}"
        class="relative flex flex-col overflow-hidden rounded-lg shadow-customSm transition duration-300 hover:shadow-lg">
        <figure class="relative h-52 w-full overflow-hidden xl:w-full">
          <img
            src="${image}"
            alt="${name}"
            class="absolute inset-0 h-full w-full object-cover object-center transition duration-300 hover:scale-105"
          />
        </figure>
        <div class="flex flex-col">
          <div class="px-6 pb-8 pt-6">
            <span
              class="mb-3 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-500"
              >${brand}</span
            >
            <h4 class="mb-2 border-b pb-3 text-base font-bold uppercase text-neutral-600">
              ${name}
            </h4>
            <div class="mt-4 flex items-center justify-between">
              <div class="flex items-baseline space-x-1 text-amber-500">
                <p class="text-lg font-medium">${price}</p>
              </div>
              <div class="flex items-center space-x-3">
                <button class="icon add__wishlist h-6 w-6" aria-label="Add to Wishlist">
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

export default new FeaturedView();
