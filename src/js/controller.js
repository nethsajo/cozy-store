import * as model from './model';
import FeaturedView from './Views/featuredView';
import DetailView from './Views/detailsView';

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

const controlProducts = async function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  DetailView.renderSpinner();
  await model.loadSingleProduct(id);
  DetailView.render(model.state.product);
};

const init = () => {
  controlFeaturedProducts();
  DetailView.addHandlerRender(controlProducts);
};

init();
