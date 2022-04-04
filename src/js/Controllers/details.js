import * as model from '../model';
import DetailView from '../Views/detailsView';

const controlProducts = async function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  DetailView.renderSpinner();
  await model.loadSingleProduct(id);
  DetailView.render(model.state.product);
};

const init = () => {
  DetailView.addHandlerRender(controlProducts);
};

init();
