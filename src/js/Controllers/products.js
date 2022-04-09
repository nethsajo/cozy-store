import * as model from '../model';
import ProductsView from '../Views/productsView';
import FilterView from '../Views/filterView';
import MenuView from '../Views/menuView';

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
    console.log(model.loadFilterPrice(value));
    ProductsView.render(model.loadFilterPrice(value));
  } catch (error) {
    ProductsView.renderError();
  }
};

const controlFilterCategory = function (value) {
  try {
    console.log(model.loadFilterCategory(value));
    ProductsView.render(model.loadFilterCategory(value));
  } catch (error) {
    ProductsView.renderError();
  }
};

const controlFilterBrand = function (value) {
  try {
    console.log(model.loadFilterBrand(value));
    ProductsView.render(model.loadFilterBrand(value));
  } catch (error) {
    ProductsView.renderError();
  }
};

const init = () => {
  controlProducts();
  FilterView.addHandlerFilterPrice(controlFilterPrice);
  FilterView.addHandlerFilterCategory(controlFilterCategory);
  FilterView.addHandlerFilterBrand(controlFilterBrand);
};

init();
