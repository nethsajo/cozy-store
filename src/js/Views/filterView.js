import View from './View';
import icons from 'url:../../icons/icons.svg';
import { formatPrice } from '../helpers';

class FilterViews extends View {
  _parentElement = document.querySelector('.filters');

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
      const value = parseInt(priceFilter.value, 10);

      if (!priceFilter) return;

      priceFilter.value = value;
      priceText.textContent = formatPrice(value);
      handler(value);
    });
  }

  _generateMarkup() {
    return /*html*/ `
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
            ${this._data.categories.map(category => this._generateProductCategories(category)).join('')}
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
            ${this._data.brands.map(brand => this._generateProductCategories(brand)).join('')}
          </div>
        </div>
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <h4 class="font-bold tracking-wide text-neutral-600">Price</h4>
            <p class="price__text font-medium text-gray-500">${formatPrice(this._data.price)}</p>
          </div>
          <form class="price__form">
            <input
              type="range"
              name="price"
              class="price__filter slider-thumb h-2 w-full appearance-none rounded-full bg-amber-200"
              value="${this._data.price}"
              min="0"
              max="${this._data.price}"
            />
          </form>
        </div>
      </aside>
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

export default new FilterViews();
