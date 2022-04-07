import { API_URL, SINGLE_API_URL } from './config';
import { getJSON, formatPrice, getUniqueValues, getMaxPrice } from './helpers';

export const state = {
  product: {},
  featured: [],
  products: [],
  filtered: [],
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
          price: product.price,
        };
      });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loadSingleProduct = async function (id) {
  try {
    const data = await getJSON(`${SINGLE_API_URL}${id}`);
    state.product = {
      id: data.id,
      name: data.name,
      brand: data.company,
      category: data.category,
      images: data.images,
      price: formatPrice(data.price),
      description: data.description,
      colors: data.colors,
      ratings: data.stars,
      reviews: data.reviews,
      stocks: data.stock,
      shipping: data.shipping,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loadAllProducts = async function () {
  try {
    const data = await getJSON(`${API_URL}`);
    state.products = data.map(product => {
      return {
        id: product.id,
        name: product.name,
        image: product.image,
        brand: product.company,
        category: product.category,
        price: product.price,
      };
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loadFilterPrice = function (value) {
  const filtered = state.products.filter(product => product.price <= value);

  if (filtered.length < 1) throw new Error('Sorry, no products matched your search!');

  state.filtered = filtered;
  console.log(state.filtered);
};
