import View from './View';
import resultView from './resultView';

class ProductsView extends View {
  _parentElement = document.querySelector('.products');
  _sortForm = document.querySelector('.sort__form');
  _productsCount = document.querySelector('.products__count');
  _errorMessage = 'Sorry, no products matched your search!';

  addHandlerSort(handler) {
    this._sortForm.addEventListener('change', function (e) {
      const select = e.target.closest('.sort');

      if (!select) return;

      const selected = select.value;

      handler('sort', selected);
    });
  }

  addHandlerRenderCountProducts(data) {
    this._productsCount.textContent = data ?? 0;
    this._productsCount.nextElementSibling.textContent = `${data > 1 ? 'products' : 'product'} found`;
  }

  _generateMarkup() {
    return /*html*/ `
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 xl:grid-cols-3">
        ${this._data.map(products => resultView.render(products, false)).join('')}
      </div>
    `;
  }
}

export default new ProductsView();
