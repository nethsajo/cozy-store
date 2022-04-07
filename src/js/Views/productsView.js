import View from './View';
import resultView from './resultView';
import icons from 'url:../../icons/icons.svg';
import homePage from '../../../public/index.html';
import { formatPrice } from '../helpers';

class ProductsView extends View {
  _parentElement = document.querySelector('.products');

  constructor() {
    super();
    this._addShowHideAccordion();
  }

  _handlerAccordion(e) {
    const accordionHeading = document.querySelectorAll('.accordion__heading');
    const accordionContent = document.querySelectorAll('.accordion__content');
    const clicked = e.target.closest('.accordion__heading');

    if (!clicked) return;

    accordionHeading.forEach(heading => heading.classList.remove('accordion__heading--active'));

    clicked.classList.add('accordion__heading--active');

    accordionContent.forEach(content => content.classList.remove('accordion__content--active'));

    clicked.nextElementSibling.classList.add('accordion__content--active');
  }

  _addShowHideAccordion() {
    this._parentElement.addEventListener('click', this._handlerAccordion.bind(this));
  }

  addHandlerFilterPrice(handler) {
    this._parentElement.addEventListener('input', function (e) {
      const priceFilter = e.target.closest('.price__filter');
      const priceText = document.querySelector('.price__text');
      const value = parseInt(priceFilter.value);

      if (!priceFilter) return;

      priceFilter.value = value;
      priceText.textContent = formatPrice(value);
      handler(value);
    });
  }

  _generateMarkup() {
    return /*html*/ `
      <section class="flex min-h-[5rem] w-full items-center bg-amber-50 sm:min-h-[8rem]">
        <div class="mx-auto w-full max-w-lg px-8 sm:max-w-2xl lg:max-w-7xl lg:px-12 2xl:max-w-screen-2xl xs:px-4">
          <nav class="flex" aria-label="Breadcrumb">
            <ul class="flex flex-wrap items-center slash:mx-2 slash:content-['/']">
              <li class="breadcrumb flex items-center">
                <a href="${homePage}" class="font-medium text-zinc-600">Home</a>
              </li>
              <li class="breadcrumb flex items-center">
                <span class="font-semibold text-amber-500">Products</span>
              </li>
            </ul>
          </nav>
        </div>
      </section>
      <section
        class="mx-auto max-w-lg px-8 py-24 sm:max-w-2xl lg:max-w-7xl lg:px-12 2xl:max-w-screen-2xl xs:px-4 xs:pt-12"
      >
        <div class="relative grid grid-cols-1 items-start gap-12 sm:grid-cols-[auto_1fr]">
          <div class="relative h-auto sm:sticky sm:top-4">
            <form class="mb-8">
              <input
                type="text"
                name="search"
                placeholder="Search..."
                class="w-full appearance-none rounded-md border-2 border-transparent bg-neutral-50 px-3 py-2 leading-normal tracking-wider text-neutral-700 placeholder-neutral-700 focus:border-amber-500 focus:bg-white focus:outline-none sm:w-auto"
              />
            </form>
            <aside class="space-y-8">
              <div class="accordion">
                <div class="accordion__heading accordion__heading--active">
                  <h4 class="font-bold tracking-wide">Category</h4>
                  <svg class="ml-auto h-6 w-6 fill-current">
                    <use xlink:href="${icons}#icon-arrow-down"></use>
                  </svg>
                </div>
                <div class="accordion__content accordion__content--active">
                  ${this._data.filters.categories.map(category => this._generateProductCategories(category)).join('')}
                </div>
              </div>
              <div class="accordion">
                <div class="accordion__heading">
                  <h4 class="font-bold tracking-wide">Brands</h4>
                  <svg class="ml-auto h-6 w-6 fill-current">
                    <use xlink:href="${icons}#icon-arrow-down"></use>
                  </svg>
                </div>
                <div class="accordion__content">
                  ${this._data.filters.brand.map(brand => this._generateProductCategories(brand)).join('')}
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <h4 class="font-bold tracking-wide text-neutral-600">Price</h4>
                  <p class="price__text font-medium text-gray-500">${formatPrice(this._data.filters.price)}</p>
                </div>
                <form class="price__form">
                  <input
                    type="range"
                    name="price"
                    class="price__filter slider-thumb h-2 w-full appearance-none rounded-full bg-amber-200"
                    value="${this._data.filters.price}"
                    min="0"
                    max=${this._data.filters.price}
                  />
                </form>
              </div>
            </aside>
          </div>
          <div class="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 xl:grid-cols-3">
            ${this._data.products.map(products => resultView.render(products, false)).join('')}
          </div>
        </div>
      </section>
    `;
  }

  _generateProductCategories(category) {
    return /*html*/ `
      <button class="font-medium text-neutral-600 capitalize transition duration-300 hover:text-amber-400" data-category="${category}">
        ${category}
      </button>
    `;
  }

  _generateProductBrands(brand) {
    return /*html*/ `
      <button class="font-medium text-neutral-600 capitalize transition duration-300 hover:text-amber-400" data-brand="${brand}">
        ${brand}
      </button>
    `;
  }
}

export default new ProductsView();
