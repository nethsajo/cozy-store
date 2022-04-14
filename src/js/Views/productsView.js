import View from './View';
import resultView from './resultView';

class ProductsView extends View {
  _parentElement = document.querySelector('.products');
  _errorMessage = 'Sorry, no products matched your search!';

  _generateMarkup() {
    return /*html*/ `
      <div class="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] items-center mb-12 gap-6">
        <div class="text-lg uppercase tracking-wider text-gray-600">
          <span class="text-amber-500 font-semibold">${this._data.length}</span>
          <span class="font-medium">${this._data.length > 1 ? 'Products' : 'Product'} found</span>
        </div>
        <hr />
        <div class="flex items-center">
          <p class="capitalize mr-2 text-gray-600 font-medium">Sort by:</p>
          <form class="sort__form">
            <select name="sort" id="sort" class="text-neutral-700 text-sm capitalize border border-neutral-100 px-4 py-2 rounded-md focus:border-amber-300 outline-none">
              <option value='price-lowest'>price (lowest)</option>
              <option value='price-highest'>price (highest)</option>
              <option value='name-a'>name (a - z)</option>
              <option value='name-z'>name (z - a)</option>
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
