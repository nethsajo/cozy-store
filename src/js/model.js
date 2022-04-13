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
  filterValues: {
    category: 'all',
    brand: 'all',
    search: '',
    price: 0,
  },
  cart: [],
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
      price: data.price,
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
    state.filterValues.price = getMaxPrice(data);
    console.log(state);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const loadFilterProductPrice = function (products, value) {
  if (!value) return;
  return products.filter(product => product.price <= value);
};

const loadFilterProductCategory = function (products, category) {
  if (category === 'all') return products;

  return products.filter(product => product.category === category);
};

const loadFilterProductBrand = function (products, brand) {
  if (brand === 'all') return products;

  return products.filter(product => product.brand === brand);
};

const loadFilterProductSearch = function (products, query) {
  if (query === '') return products;

  return products.filter(product => product.name.toLowerCase().includes(query));
};

export const loadFilterProducts = function (key, value) {
  //possible values 1200, 'all', 'all' 'albany'
  //possible keys 'price', 'category', 'brand', 'search'
  state.filterValues[key] = value;
  /*
    filterValues: {
      price: 1200,
      category: 'all',
      brand: 'all',
      search: 'albany'
    }
  */
  let filteredResult = [...state.products];

  Object.entries(state.filterValues).forEach(([key, value]) => {
    if (key === 'price') {
      filteredResult = loadFilterProductPrice(filteredResult, value);
      return;
    }

    if (key === 'category') {
      filteredResult = loadFilterProductCategory(filteredResult, value);
      return;
    }

    if (key === 'brand') {
      filteredResult = loadFilterProductBrand(filteredResult, value);
      return;
    }

    if (key === 'search') {
      filteredResult = loadFilterProductSearch(filteredResult, value);
      return;
    }
  });

  state.filtered = filteredResult;
};

export const addToCart = function (id, color, quantity, product) {
  const isInCart = state.cart.find(index => index.id === id + color);

  if (isInCart) {
    state.cart.map(item => {
      if (item.id === id + color) {
        let newQuantity = item.quantity + Number(quantity);
        if (newQuantity > item.max) newQuantity = item.max;
        item.quantity = newQuantity;
        storeCart();
      }
    });
  } else {
    const newItem = {
      id: id + color,
      name: product.name,
      price: product.price,
      image: product.images[0].url,
      color,
      quantity: +quantity,
      max: product.stocks,
    };

    state.cart.push(newItem);
    storeCart();
  }
};

export const updateQuantity = function (quantity, id) {
  const isInCart = state.cart.find(index => index.id === id);

  if (isInCart) {
    state.cart.map(item => {
      if (item.id === id) {
        //if the current quantity is greater than the items stocks (max)
        //set the value of quantity to max
        if (quantity > item.max) quantity = item.max;
        item.quantity = quantity;
        storeCart();
      }
    });
  }
};

export const removeCart = function (id) {
  const index = state.cart.findIndex(item => item.id === id);

  state.cart.splice(index, 1);

  console.log(state.cart);

  storeCart();
};

const storeCart = function () {
  localStorage.setItem('cart', JSON.stringify(state.cart));
};

const init = function () {
  const storage = localStorage.getItem('cart');

  if (storage) state.cart = JSON.parse(storage);
};

init();
