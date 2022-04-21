import * as model from './model';
import CartView from './Views/cartView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

export const controlCart = function () {
  CartView.render(model.state.cart);
  CartView.addHandlerTotal(model.state.cart);
};

export const controlProductQuantity = function (quantity, id) {
  model.updateQuantity(quantity, id);
  CartView.update(model.state.cart);
  CartView.addHandlerTotal(model.state.cart);
};

export const controlProductRemove = function (id) {
  model.removeCart(id);
  CartView.render(model.state.cart);
  CartView.addHandlerTotal(model.state.cart);
};

const init = () => {
  CartView.addHandlerRender(controlCart);
  CartView.addHandlerUpdateQuantity(controlProductQuantity);
  CartView.addHandlerProductRemove(controlProductRemove);
};

init();
