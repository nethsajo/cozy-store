import { API_URL, SINGLE_API_URL } from './config';
import { getJSON, formatPrice, getUniqueValues, getMaxPrice } from './helpers';

export const state = {
  featured: [],
  product: {},
  results: {
    products: [],
    filtered: [],
    filters: {
      categories: [],
      brand: [],
      price: {},
    },
  },
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
    state.results.products = data.map(product => {
      return {
        id: product.id,
        name: product.name,
        image: product.image,
        brand: product.company,
        price: product.price,
      };
    });

    state.results.filters.categories = getUniqueValues(data, 'category');
    state.results.filters.brand = getUniqueValues(data, 'company');
    state.results.filters.price = getMaxPrice(data);
    // console.log(state.results.filters);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loadFilterPrice = function (value) {
  const filtered = state.results.products.filter(product => product.price <= value);

  if (filtered.length < 1) console.log('Sorry, no products matched your search!');

  state.results.filtered = filtered;
  console.log(state.results.filtered);
};
