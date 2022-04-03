class DetailView {
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
}

export default new DetailView();
