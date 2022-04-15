import View from './View';
import resultView from './resultView';

class ProductsView extends View {
  _parentElement = document.querySelector('.products');
  _sortForm = document.querySelector('.sort__form');
  _productsCount = document.querySelector('.products__count');
  _errorMessage = 'Sorry, no products matched your search!';

  addHandlerSort(handler) {
    this._parentElement.addEventListener('change', function (e) {
      const select = e.target.closest('.sort');

      if (!select) return;

      const selected = select.value;

      handler('sort', selected);
    });
  }

  _generateMarkup() {
    return /*html*/ `
      <div class="mb-12 grid grid-cols-1 items-center gap-6 lg:grid-cols-[auto_1fr_auto]">
        <div class="text-lg uppercase tracking-wider text-gray-600">
          <span class="products__count font-semibold text-amber-500">${this._data.length ?? 0}</span>
          <span class="products__count--text font-medium">${this._data.length > 1 ? 'products' : 'product'} found</span>
        </div>
        <hr />
        <div class="flex items-center">
          <p class="mr-2 font-medium capitalize text-gray-600">Sort by:</p>
          <form class="sort__form">
            <select
              name="sort"
              id="sort"
              class="sort rounded-md border border-neutral-100 px-4 py-2 text-sm capitalize text-neutral-700 outline-none focus:border-amber-300"
            >
              <option value="" disabled selected>Select an option</option>
              <option value="price-low-high">price: (low &mdash; high)</option>
              <option value="price-high-low">price: (high &mdash; low)</option>
              <option value="name-a-z">name (a - z)</option>
              <option value="name-z-a">name (z - a)</option>
            </select>
          </form>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 xl:grid-cols-3">
        ${this._data.map(products => resultView.render(products, false)).join('')}
      </div>
    `;
  }
}

export default new ProductsView();
