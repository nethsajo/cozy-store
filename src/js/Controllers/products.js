import * as model from '../model';
import ProductsView from '../Views/productsView';

const controlProducts = async function () {
  try {
    ProductsView.renderSpinner();
    await model.loadAllProducts();
    ProductsView.render(model.state.results);
  } catch (error) {
    console.error(`${error}`);
  }
};

const controlFilterPrice = function (value) {
  model.loadFilterPrice(value);
};

const init = () => {
  controlProducts();
  ProductsView.addHandlerFilterPrice(controlFilterPrice);
};

init();
