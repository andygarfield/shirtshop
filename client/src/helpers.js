// fetchOne fetches data from and endpoint string
// and caches the result in sessionStorage
export async function fetchOne(endpoint) {
  // check session storage to see if the result is cached
  let cachedData = sessionStorage.getItem(endpoint)
  if (cachedData) {
    return Promise.resolve(JSON.parse(cachedData));
  }

  // if not cached, fetch the the data and return a json promise
  let res = await fetch(endpoint).then(res => res.json());
  sessionStorage.setItem(endpoint, JSON.stringify(res));

  return Promise.resolve(res);
}

// fetchMultiple takes an array of endpoint strings and fetches the json
export async function fetchMultiple(endpoints) {
  let promises = endpoints.map(e => fetchOne(e));
  let responses = await Promise.all(promises);

  return Promise.resolve(responses);
}

// storeCart saves the cart to localStorage
export const storeCart = (cart) => {localStorage.setItem('cart' ,JSON.stringify(cart))}

// createFilter creates an unselected filter from an array of objects 
export const createFilter = (items) => ({items, selectedIndex: -1});

// copyObj copies an object
export const copyObj = (obj) => JSON.parse(JSON.stringify(obj));

// removeArrayIndex removes the specified index in the input array
export const removeArrayIndex = (arr, index) => {
  return arr.filter((el, i) => {
      return i != index;
  });
}

// toCurrency can be used as a Vue filter to change a number to currency in the view
export const toCurrency = value => {
  if (typeof value !== "number") {
      return value;
  }
  var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
  });
  return formatter.format(value);
}

// colorMap is for the color picker popup
export const colorMap = {
  White: "#fff",
  Black: "#000",
  Red: "#d00",
  Orange: "#ffa500",
  Yellow: "#ff0",
  Green: "#0c0",
  Blue: "#00f",
  Indigo: "#4b0082",
  Purple: "#800080"
};