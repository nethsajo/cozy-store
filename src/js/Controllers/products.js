import * as model from '../model';
import ProductsView from '../Views/productsView';
import MenuView from '../Views/menuView';

const controlProducts = async function () {
  try {
    ProductsView.renderSpinner();
    await model.loadAllProducts();
    ProductsView.render(model.state.products);
  } catch (error) {
    console.error(`${error} 💥💥💥`);
  }
};

const controlFilterPrice = function (value) {
  try {
    model.loadFilterPrice(value);
    // ProductsView.update(model.state.filtered);
  } catch (error) {
    console.error(`${error} 💥💥💥`);
  }
};

const init = () => {
  controlProducts();
  ProductsView.addHandlerFilterPrice(controlFilterPrice);
};

init();
