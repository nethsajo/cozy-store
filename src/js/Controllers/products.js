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

const controlFilterProductByType = function (type, value) {
  try {
    console.log(model.loadFilterProductByType(type, value));
    ProductsView.render(model.loadFilterProductByType(type, value));
  } catch (error) {
    ProductsView.renderError();
  }
};

const controlSearchProducts = function (query) {
  try {
    console.log(model.loadSearchProduct(query));
    ProductsView.render(model.loadSearchProduct(query));
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
