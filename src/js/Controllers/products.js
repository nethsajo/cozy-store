import * as model from '../model';
import ProductsView from '../Views/productsView';
import FilterView from '../Views/filterView';
import MenuView from '../Views/menuView';

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

const controlFilterPrice = function (value) {
  try {
    model.state.filtered = model.loadFilterPrice(value);
    ProductsView.render(model.state.filtered);
  } catch (error) {
    ProductsView.renderError();
  }
};

const controlFilterProductByType = function (type, value) {
  try {
    model.state.filtered = model.loadFilterProductByType(type, value);
    ProductsView.render(model.state.filtered);
  } catch (error) {
    ProductsView.renderError();
  }
};

const controlSearchProducts = function (query) {
  try {
    model.state.filtered = model.loadSearchProduct(query);
    ProductsView.render(model.state.filtered);
  } catch (error) {
    ProductsView.renderError();
  }
};

const init = () => {
  controlProducts();
  FilterView.addHandlerFilterPrice(controlFilterPrice);
  FilterView.addHandlerFilterCategory(controlFilterProductByType);
  FilterView.addHandlerFilterBrand(controlFilterProductByType);
  FilterView.addHandlerSearch(controlSearchProducts);
};

init();
