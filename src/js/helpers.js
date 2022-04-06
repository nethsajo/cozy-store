import { TIMEOUT, CURRENCY, LOCALE } from './config';

const timeout = function (seconds) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${seconds} seconds!`));
    }, seconds * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT)]);

    const data = await response.json();

    if (!response.ok) throw new Error(`There's a problem getting the data! Error: ${response.status}`);

    return data;
  } catch (error) {
    throw error;
  }
};

export const formatPrice = function (price) {
  return new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency: CURRENCY,
  }).format((price / 100).toFixed(2));
};

export const getUniqueValues = function (data, type) {
  let unique = data.map(product => product[type]);

  return ['all', ...new Set(unique)];
};

export const getMaxPrice = function (data) {
  let maxPrice = data.map(product => product.price);
  maxPrice = Math.max(...maxPrice);

  return maxPrice;
};
