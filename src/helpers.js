export function apiGet(commitFunc, endpoint, mutation) {
  fetch(endpoint)
    .then(response => response.json())
    .then(j => commitFunc(mutation, j))
    .catch(error => console.log(error));
}

export const fetchAndParse = (endpoint) => {
  // check local storage to see if the result is cached
  let cachedData = localStorage.getItem(endpoint)
  if (cachedData) {
    return Promise.resolve(cachedData);
  }

  // return the json promise if not
  return fetch(endpoint).then(res => res.json());
}

export const createFilter = (items) => ({items, selectedIndex: -1});
