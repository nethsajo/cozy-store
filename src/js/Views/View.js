import icons from 'url:../../icons/icons.svg';

export default class View {
  _data;

  render(data, render = true) {
    if (!data || data.length === 0) return this.renderError();

    this._data = data;

    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    //convert markup string to a DOM object.
    //The createContextualFragment() will convert the string into real DOM node objects
    //The newDOM will become like a big object
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    //get all the elements in the newDOM
    //store the converted newDOM into an array (shallow-copy)
    const newElements = Array.from(newDOM.querySelectorAll('*'));

    //get the actual elements that are currently on the page
    //store the current elements to a real array
    const currentElements = Array.from(this._parentElement.querySelectorAll('*'));

    //Loop the newElements
    newElements.forEach((newElement, i) => {
      //The currentElement is eqaul currentElements at position i.
      const currentElement = currentElements[i];

      //Updates changed TEXT
      //isEqualNode will compare the content of newElement and currentElement; returs true or false
      //if newElement and currentElement is not equal or they are different
      //Then change the text content of the currentElement to the textContent of the newElement
      //Another check: select the firstChild of newElement that is actually what contains the text
      if (!newElement.isEqualNode(currentElement) && newElement.firstChild?.nodeValue.trim() !== '') {
        // console.log('💥', newElement.firstChild.nodeValue.trim());
        //This is essentially updating the DOM only in places where it has changed or where it was about to change
        currentElement.textContent = newElement.textContent;
      }

      //Updates changed ATTRIBUTES
      //if newElement and currentElement is not equal or they are different
      if (!newElement.isEqualNode(currentElement)) {
        //Convert it to an array and loop over newElement attributes
        //For each of them is an attribute then on the currentElement set the attribute.
        Array.from(newElement.attributes).forEach(attr => currentElement.setAttribute(attr.name, attr.value));
      }
    });
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

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = /*html*/ `
      <div class="flex flex-col items-center justify-center gap-4 min-h-[inherit] px-6">
        <svg class="h-10 w-10 fill-red-600">
          <use xlink:href="${icons}#icon-warning"></use>
        </svg>
        <span class="text-xl text-center text-neutral-600 font-medium sm:text-xl xs:text-lg">${message}</span>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}
