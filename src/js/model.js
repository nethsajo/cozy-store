import { API_URL, SINGLE_API_URL } from './config';
import { getJSON, getUniqueValues, getMaxPrice } from './helpers';

export const state = {
  product: {},
  featured: [],
  products: [],
  filtered: [],
  cart: [],
  filters: {
    categories: [],
    brands: [],
    colors: [],
    price: 0,
  },
  sort: 'price-low-high',
  filterValues: {
    category: 'all',
    brand: 'all',
    color: 'all',
    search: '',
    price: 0,
  },
};

export const loadFeaturedProduct = async function () {
  try {
    const data = await getJSON(`${API_URL}`);
    state.featured = data
      .filter(product => product.featured === true)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4)
      .map(product => {
        return {
          id: product.id,
          name: product.name,
          image: product.image,
          brand: product.company,
          price: product.price,
          shipping: product.shipping,
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
    state.products = data
      .sort((x, y) => x.price - y.price)
      .map(product => {
        return {
          id: product.id,
          name: product.name,
          image: product.image,
          brand: product.company,
          category: product.category,
          colors: product.colors,
          price: product.price,
          shipping: product.shipping,
        };
      });

    state.filters = {
      categories: getUniqueValues(data, 'category'),
      brands: getUniqueValues(data, 'company'),
      colors: getUniqueValues(data, 'colors'),
      price: getMaxPrice(data),
    };

    state.filterValues.price = getMaxPrice(data);
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

const loadFilterProductColor = function (products, color) {
  if (color === 'all') return products;

  const result = products.filter(product => {
    return product.colors.find(c => c === color);
  });

  return result;
};

const loadFilterProductSearch = function (products, query) {
  if (query === '') return products;

  return products.filter(product => product.name.toLowerCase().includes(query));
};

const loadSortProducts = function (products, sort) {
  //price-low-high, price - high - low; name - a - z; name - z - a;
  if (sort === 'price-low-high') {
    return products.sort((x, y) => x.price - y.price);
  }

  if (sort === 'price-high-low') {
    return products.sort((x, y) => y.price - x.price);
  }

  if (sort === 'name-a-z') {
    return products.sort((x, y) => x.name.localeCompare(y.name));
  }

  if (sort === 'name-z-a') {
    return products.sort((x, y) => y.name.localeCompare(x.name));
  }
};

export const loadFilterProducts = function (key, value = '') {
  //possible values 1200, 'all', 'all', 'all', 'albany'
  //possible keys 'price', 'category', 'brand', '#000', 'search'
  /*
    filterValues: {
      price: 1200,
      category: 'all',
      brand: 'all',
      color: 'all',
      search: 'albany'
    }
  */
  state.filterValues[key] = value;

  let filteredResult = [...state.products];

  Object.entries(state.filterValues).forEach(([key, value]) => {
    if (key === 'sort') {
      filteredResult = loadSortProducts(filteredResult, value);
    }

    if (key === 'category') {
      filteredResult = loadFilterProductCategory(filteredResult, value);
      return;
    }

    if (key === 'brand') {
      filteredResult = loadFilterProductBrand(filteredResult, value);
      return;
    }

    if (key === 'price') {
      filteredResult = loadFilterProductPrice(filteredResult, value);
      return;
    }

    if (key === 'color') {
      filteredResult = loadFilterProductColor(filteredResult, value);
      return;
    }

    if (key === 'search') {
      filteredResult = loadFilterProductSearch(filteredResult, value);
      return;
    }

    if (key === 'clear') {
      return (state.filterValues = {
        search: '',
        category: 'all',
        brand: 'all',
        color: 'all',
        price: state.filters.price,
      });
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
        if (newQuantity > item.max) {
          newQuantity = item.max;
        }
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
        //if the added quantity is greater than the items stocks (max)
        //set the value of quantity to max
        if (quantity > item.max) {
          quantity = item.max;
        }

        item.quantity = quantity;
        storeCart();
      }
    });
  }
};

export const removeCart = function (id) {
  const index = state.cart.findIndex(item => item.id === id);

  state.cart.splice(index, 1);

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
