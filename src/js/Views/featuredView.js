import View from './View';
import resultView from './resultView';

class FeaturedView extends View {
  _parentElement = document.querySelector('.featured');
  _errorMessage = 'No products found!';

  _generateMarkup() {
    return /*html*/ `
      <div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 xl:gap-12">
        ${this._data.map(product => resultView.render(product, false)).join('')}
      </div>    
    `;
  }
}

export default new FeaturedView();
