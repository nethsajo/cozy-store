import FeaturedView from '../Views/featuredView';
import * as model from '../model';

import { controlCart, controlProductQuantity, controlProductRemove } from '../controller';

const controlFeaturedProducts = async function () {
  try {
    FeaturedView.renderSpinner();
    await model.loadFeaturedProduct();
    FeaturedView.render(model.state.featured);
  } catch (error) {
    console.error(`${error} 💥💥💥`);
    throw error;
  }
};

const init = function () {
  controlFeaturedProducts();
};

init();
