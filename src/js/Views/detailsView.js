import View from './Views';
import icons from '../../icons/icons.svg';

class DetailView extends View {
  _parentElement = document.querySelector('.product__details');

  constructor() {
    super();
    this._addHandlerProductGallery();
    this._addHandlerProductColor();
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _addHandlerProductGallery() {
    this._parentElement.addEventListener('click', function (e) {
      const images = document.querySelectorAll('.gallery__images');
      const clicked = e.target.closest('.gallery__images');

      if (!clicked) return;

      images.forEach(image => image.classList.remove('gallery__img--active'));

      clicked.classList.add('gallery__img--active');

      document.querySelector('.gallery__image').src = clicked.src;
    });
  }

  _addHandlerProductColor() {
    this._parentElement.addEventListener('click', function (e) {
      const colors = document.querySelectorAll('.product__color');
      const clicked = e.target.closest('.product__color');

      if (!clicked) return;

      // const checked = `
      //   <svg class="h-4 w-4 fill-current">
      //     <use xlink:href="${icons}#icon-check"></use>
      //   </svg>
      // `;

      // clicked.innerHTML = '';
      // clicked.insertAdjacentHTML('afterbegin', checked);
    });
  }

  _generateMarkup() {
    return /*html*/ `
      <div class="flex min-h-[5rem] w-full items-center bg-amber-50 sm:min-h-[8rem]">
        <div class="mx-auto w-full max-w-lg px-8 sm:max-w-2xl lg:max-w-7xl lg:px-12 2xl:max-w-screen-2xl xs:px-4">
          <nav class="flex" aria-label="Breadcrumb">
            <ul class="flex flex-wrap items-center slash:mx-2 slash:content-['/']">
              <li class="breadcrumb flex items-center">
                <a href="../../../public/index.html" class="font-medium text-zinc-600">Home</a>
              </li>
              <li class="breadcrumb flex items-center">
                <a href="../../../public/pages/products.html" class="font-medium text-zinc-600">Product</a>
              </li>
              <li class="breadcrumb flex items-center">
                <span class="font-semibold capitalize text-amber-500">${this._data.name}</span>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div class="mx-auto max-w-lg px-8 py-12 sm:max-w-2xl lg:max-w-7xl lg:px-12 2xl:max-w-screen-2xl xs:px-4 sm:py-24">
        <div class="grid grid-cols-1 gap-12 xl:grid-cols-2">
          <div class="flex flex-col items-start">
            <figure class="relative mb-6 h-64 w-full sm:h-[31rem] xs:h-48">
              <img
                src="${this._data.images[0].url}"
                alt="Chair"
                class="gallery__image absolute inset-0 h-full w-full rounded-lg object-cover object-center"
              />
            </figure>
            <div class="gallery flex flex-nowrap space-x-4 overflow-x-auto pb-2">
              ${this._data.images.map(image => this._generateProductGallery(image)).join('')}
            </div>
          </div>
          <div class="flex flex-col">
            <h2 class="mb-6 text-3xl font-bold capitalize tracking-wide text-gray-800 sm:text-5xl xs:text-xl xs:mb-3">
              ${this._data.name}
            </h2>
            <div class="flex flex-wrap items-center gap-2 mb-6">
              <div class="flex items-center space-x-0.5">
                ${this._generateProductRatings(this._data.ratings)}
              </div>
              <span class="text-neutral-400 font-medium xs:text-xs">
                ${this._data.reviews < 1 ? `(No customer review)` : `(${this._data.reviews} customer reviews)`}
              </span>
            </div>
            <span class="mb-6 inline-block text-xl font-medium text-amber-500 sm:text-3xl">${this._data.price}</span>
            <p class="product__info mb-10 leading-7 text-neutral-600 xs:text-justify">
              ${this._data.description}
            </p>
            <div class="mb-8 flex flex-col space-y-4 border-b border-neutral-300 pb-6">
              <div class="product__cols">
                <span class="product__info font-medium text-gray-800">SKU:</span>
                <span class="product__info text-neutral-600">${this._data.id}</span>
              </div>
              <div class="product__cols">
                <span class="product__info font-medium text-gray-800">Brand:</span>
                <span class="product__info capitalize text-neutral-600">${this._data.brand}</span>
              </div>
              <div class="product__cols">
                <span class="product__info font-medium text-gray-800">Available:</span>
                <span class="product__info text-neutral-600">${
                  this._data.stocks > 0 && this._data.stocks < 10
                    ? `Only ${this._data.stocks} items left`
                    : this._data.stocks >= 10
                    ? 'In Stocks'
                    : 'Out of Stock'
                }</span>
              </div>
              <div class="product__cols mb-8 items-center">
                <span class="product__info font-medium text-gray-800">Colors:</span>
                <div class="flex items-center space-x-4">
                  ${this._data.colors.map(color => this._generateProductColors(color)).join('')}
                </div>
              </div>
            </div>
            ${
              this._data.stocks > 0
                ? /*html*/ `
                <div class="flex flex-wrap items-center justify-center gap-8 sm:justify-start">
                  <div class="flex items-center">
                    <button type="button" class="btn__control h-8 w-8">
                      <svg class="h-5 w-5 fill-current">
                        <use xlink:href="${icons}#icon-minus"></use>
                      </svg>
                    </button>
                    <span class="mx-4 text-xl font-semibold text-neutral-600">1</span>
                    <button type="button" class="btn__control h-8 w-8">
                      <svg class="h-5 w-5 fill-current">
                        <use xlink:href="${icons}#icon-add"></use>
                      </svg>
                    </button>
                  </div>
                  <button
                    class="rounded-full bg-amber-500 px-4 py-2 text-sm font-medium uppercase tracking-wide text-white transition duration-300 hover:bg-amber-400 sm:text-base"
                  >
                    Add to Cart
                  </button>
                </div>
              `
                : ''
            }
          </div>
        </div>
      </div>
    `;
  }

  _generateProductGallery(image) {
    const { id, url, filename } = image;

    return /*html*/ `
      <img
        src="${url}"
        alt="${filename}"
        class="gallery__images block h-14 cursor-pointer rounded-sm object-cover sm:h-28 lg:h-32 xl:h-20"
        data-id="${id}"
      />
    `;
  }

  _generateProductColors(color) {
    return /*html*/ `
      <button class="product__color flex h-6 w-6 items-center justify-center rounded-full text-white" style="background-color: ${color}" data-color=${color}>
        <svg class="h-4 w-4 fill-current">
          <use xlink:href="${icons}#icon-check"></use>
        </svg>
      </button>
    `;
  }

  _generateProductRatings(ratings) {
    const stars = Array.from({ length: 5 }, (_, index) => {
      const number = index + 0.5;
      console.log(ratings, index, number);

      return /*html*/ `
        <span class="text-yellow-400">
          <svg class="h-5 w-5 fill-current">
            <use xlink:href="${icons}#icon-star${ratings > number ? '-fill' : ratings > index ? '-half' : ''}">
            </use>
          </svg>
        </span>
      `;
    }).join('');

    return stars;
  }
}

export default new DetailView();
