import { API_URL, SINGLE_API_URL } from './config';
import { getJSON, formatPrice, getUniqueValues, getMaxPrice } from './helpers';

export const state = {
  product: {},
  featured: [],
  products: [],
  filters: {
    categories: [],
    brands: [],
    price: 0,
  },
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

    state.filters.categories = getUniqueValues(data, 'category');
    state.filters.brands = getUniqueValues(data, 'company');
    state.filters.price = getMaxPrice(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loadFilterPrice = function (value) {
  if (!value) return;

  return state.products.filter(product => product.price <= value);
};

export const loadFilterCategory = function (value) {
  if (value === 'all') return state.products;

  return state.products.filter(product => product.category === value);
};

export const loadFilterBrand = function (value) {
  if (value === 'all') return state.products;

  return state.products.filter(product => product.brand === value);
};
