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
    FilterView.render(model.state.filters);
    ProductsView.render(model.state.products);
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

const controlClearFilter = function (key) {
  model.loadFilterProducts(key);
  FilterView.render(model.state.filters);
  ProductsView.render(model.state.products);
};

const init = () => {
  controlProducts();
  FilterView.addHandlerFilterPrice(controlFilterProduct);
  FilterView.addHandlerFilterCategory(controlFilterProduct);
  FilterView.addHandlerFilterBrand(controlFilterProduct);
  FilterView.addHandlerFilterColor(controlFilterProduct);
  FilterView.addHandlerSearch(controlFilterProduct);
  FilterView.addHandlerClearFilters(controlClearFilter);
  ProductsView.addHandlerSort(controlFilterProduct);
};

init();
