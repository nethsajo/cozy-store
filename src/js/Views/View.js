import icons from 'url:../../icons/icons.svg';

export default class View {
  _data;

  render(data, render = true) {
    if (!data || data.length === 0) return this.renderError();

    this._data = data;

    const markup = this._generateMarkup();

    if (!render) return markup;

    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const markup = /*html*/ `
      <div class="flex flex-col items-center justify-center min-h-[inherit]">
        <div class="ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    `;

    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = /*html*/ `
      <div class="flex flex-col items-center justify-center gap-4 min-h-[inherit]">
        <svg class="h-6 w-6 sm:h-10 sm:w-10 fill-red-600">
          <use xlink:href="${icons}#icon-warning"></use>
        </svg>
        <span class="text-xl text-neutral-600 font-medium sm:text-xl xs:text-lg">${message}</span>
      </div>
    `;

    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _parseStringtoHTML(html) {
    const parser = new DOMParser();
    return parser.parseFromString(html, 'text/html');
  }
}
