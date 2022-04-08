import View from './View';
import resultView from './resultView';

class ProductsView extends View {
  _parentElement = document.querySelector('.products');
  _errorMessage = 'Sorry, no products matched your search!';

  _generateMarkup() {
    return /*html*/ `
      <div class="text-xl font-semibold uppercase mb-6 tracking-wider text-neutral-600">
        <span>${this._data.length}</span>
        <span>Products found</span>
      </div>
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 xl:grid-cols-3">
        ${this._data.map(products => resultView.render(products, false)).join('')}
      </div>
    `;
  }
}

export default new ProductsView();
