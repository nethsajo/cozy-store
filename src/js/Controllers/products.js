import * as model from '../model';
import ProductsView from '../Views/productsView';
import FilterView from '../Views/filterView';
import MenuView from '../Views/menuView';

import { controlCart, controlProductQuantity, controlProductRemove } from '../controller';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlProducts = async function () {
  try {
    ProductsView.renderSpinner();
    await model.loadAllProducts();
    ProductsView.render(model.state.products);
    FilterView.render(model.state.filters);
  } catch (error) {
    console.error(`${error} 💥💥💥`);
  }
};

const controlFilterProduct = function (key, value) {
  try {
    model.loadFilterProducts(key, value);
    ProductsView.render(model.state.filtered);
  } catch (error) {
    ProductsView.renderError();
  }
};

const init = () => {
  controlProducts();
  FilterView.addHandlerFilterPrice(controlFilterProduct);
  FilterView.addHandlerFilterCategory(controlFilterProduct);
  FilterView.addHandlerFilterBrand(controlFilterProduct);
  FilterView.addHandlerSearch(controlFilterProduct);
};

init();
