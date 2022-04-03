export default class View {
  _data;

  render(data) {
    if (!data || data.length === 0) return this.renderError();

    this._data = data;

    const markup = this._generateMarkup();
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
}
