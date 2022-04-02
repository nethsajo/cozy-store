import { API_URL } from './config';
import { getJSON, formatPrice } from './helpers';

export const state = {
  featured: [],
};

export const loadFeaturedProduct = async function () {
  try {
    const data = await getJSON(`${API_URL}`);
    state.featured = data
      .filter(product => product.featured === true)
      .slice(0, 3)
      .map(product => {
        return {
          id: product.id,
          name: product.name,
          image: product.image,
          brand: product.company,
          price: formatPrice(product.price),
        };
      });
    console.log(state.featured);
    return state.featured;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
