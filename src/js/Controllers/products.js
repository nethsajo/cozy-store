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

const controlFilterPrice = function (key, value) {
  try {
    model.loadFilterProducts(key, value);
    console.log(model.state);

    ProductsView.render(model.state.filtered);
  } catch (error) {
    ProductsView.renderError();
  }
};

const controlFilterProductCategory = function (key, value) {
  try {
    model.loadFilterProducts(key, value);
    console.log(model.state);
    ProductsView.render(model.state.filtered);
  } catch (error) {
    ProductsView.renderError();
  }
};

const controlFilterProductBrand = function (key, value) {
  try {
    model.loadFilterProducts(key, value);
    console.log(model.state);
    ProductsView.render(model.state.filtered);
  } catch (error) {
    ProductsView.renderError();
  }
};

const controlSearchProducts = function (key, value) {
  try {
    model.loadFilterProducts(key, value);
    console.log(model.state);
    ProductsView.render(model.state.filtered);
  } catch (error) {
    ProductsView.renderError();
  }
};

const init = () => {
  controlProducts();
  FilterView.addHandlerFilterPrice(controlFilterPrice);
  // FilterView.addHandlerFilterPrice(controlFilterProducts);
  FilterView.addHandlerFilterCategory(controlFilterProductCategory);
  FilterView.addHandlerFilterBrand(controlFilterProductBrand);
  FilterView.addHandlerSearch(controlSearchProducts);
};

init();
