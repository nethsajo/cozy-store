import * as model from '../model';
import DetailView from '../Views/detailsView';
import CartView from '../Views/cartView';
import MenuView from '../Views/menuView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlProductDetails = async function () {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (!id) return;

    DetailView.renderSpinner();
    await model.loadSingleProduct(id);
    DetailView.render(model.state.product);
  } catch (error) {
    DetailView.renderError();
    console.error(`${error} 💥💥💥`);
  }
};

const controlAddtoCart = function (id, color, quantity, product) {
  model.addToCart(id, color, quantity, product);
  console.log(model.state.cart);
  CartView.render(model.state.cart);
};

const controlCart = function () {
  CartView.render(model.state.cart);
};

const init = () => {
  DetailView.addHandlerRender(controlProductDetails);
  DetailView.addHandlerAddtoCart(controlAddtoCart);
  CartView.addHandlerRender(controlCart);
};

init();
