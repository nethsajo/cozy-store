import * as model from '../model';
import DetailView from '../Views/detailsView';

const controlProducts = async function () {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (!id) return;

    DetailView.renderSpinner();
    await model.loadSingleProduct(id);
    DetailView.render(model.state.product);
  } catch (error) {
    console.error(`${error} 💥💥💥`);
    DetailView.renderError();
  }
};

const init = () => {
  DetailView.addHandlerRender(controlProducts);
};

init();
