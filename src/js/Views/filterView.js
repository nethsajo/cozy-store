import View from './View';
import icons from 'url:../../icons/icons.svg';
import { formatPrice } from '../helpers';

class FilterViews extends View {
  _parentElement = document.querySelector('.filters');
  _searchForm = document.querySelector('.search__form');

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
      handler('price', value);
    });
  }

  addHandlerFilterCategory(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btnCategories = document.querySelectorAll('.btn__category');
      const clicked = e.target.closest('.btn__category');

      if (!clicked) return;

      btnCategories.forEach(btn => btn.classList.remove('filter__active'));

      clicked.classList.add('filter__active');

      const { category } = clicked.dataset;

      handler('category', category);
    });
  }

  addHandlerFilterBrand(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btnBrands = document.querySelectorAll('.btn__brand');
      const clicked = e.target.closest('.btn__brand');

      if (!clicked) return;

      btnBrands.forEach(btn => btn.classList.remove('filter__active'));

      clicked.classList.add('filter__active');

      const { brand } = clicked.dataset;

      handler('brand', brand);
    });
  }

  addHandlerFilterColor(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const colors = document.querySelectorAll('.btn__color');
      const clicked = e.target;

      if (!clicked.classList.contains('btn__color')) return;

      for (const color of colors) {
        color.classList.remove('filter__color--active', 'filter__color-all--active');
      }

      clicked.innerText !== 'All'
        ? clicked.classList.add('filter__color--active')
        : clicked.classList.add('filter__color-all--active');

      const { color } = clicked.dataset;

      handler('color', color);
    });
  }

  addHandlerSearch(handler) {
    this._searchForm.addEventListener('keyup', function (e) {
      e.preventDefault();

      const query = document.querySelector('.search__input').value;

      handler('search', query);
    });
  }

  addHandlerClearFilters(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn__clear');

      if (!btn) return;

      handler('clear');
    });
  }

  _generateMarkup() {
    return /*html*/ `
      <aside class="space-y-6">
        <div class="accordion">
          <div class="accordion__heading accordion__heading--active">
            <h4 class="font-bold text-sm sm:text-base tracking-wide">Category</h4>
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
            <h4 class="font-bold text-sm sm:text-base tracking-wide">Brands</h4>
            <svg class="ml-auto h-6 w-6 fill-current">
              <use xlink:href="${icons}#icon-arrow-down"></use>
            </svg>
          </div>
          <div class="accordion__content">
            ${this._data.brands.map(brand => this._generateProductBrands(brand)).join('')}
          </div>
        </div>
        <div class="flex flex-wrap items-center justify-between gap-4">
          <h4 class="font-bold text-sm sm:text-base tracking-wide text-neutral-600">Colors</h4>
          <div class="flex items-center space-x-3">
            ${this._data.colors.map(color => this._generateProductColors(color)).join('')}
          </div>
        </div>
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <h4 class="text-sm sm:text-base font-bold tracking-wide text-neutral-600">Price</h4>
            <p class="price__text text-sm sm:text-base font-medium text-gray-500">${formatPrice(this._data.price)}</p>
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
        <button
          class="btn__clear rounded-sm bg-red-500 px-2 py-1 text-sm font-medium uppercase text-white transition duration-300 hover:bg-red-600"
        >
          Clear Filters
        </button>
      </aside>
    `;
  }

  _generateProductCategories(category) {
    return /*html*/ `
      <button class="btn__category ${
        category === 'all' ? 'filter__active' : ''
      } font-medium text-neutral-600 capitalize transition duration-300 last:pb-4 hover:text-amber-400" data-category="${category}">
        ${category}
      </button>
    `;
  }

  _generateProductBrands(brand) {
    return /*html*/ `
      <button class="btn__brand ${
        brand === 'all' ? 'filter__active' : ''
      } font-medium text-neutral-600 capitalize transition duration-300 last:pb-4 hover:text-amber-400" data-brand="${brand}">
        ${brand}
      </button>
    `;
  }

  _generateProductColors(color) {
    return /*html*/ `
      ${
        color === 'all'
          ? `<button class="btn__color font-medium text-neutral-600 ${
              color === 'all' ? 'filter__color-all--active' : ''
            } transition duration-300" data-color="all">
              All
            </button>`
          : `<button class="btn__color h-4 w-4 rounded-full transition duration-300" style="background-color: ${color}" data-color="${color}"></button>`
      }
    `;
  }
}

export default new FilterViews();
