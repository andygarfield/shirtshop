export function apiGet(commitFunc, endpoint, mutation) {
  fetch(endpoint)
    .then(response => response.json())
    .then(j => commitFunc(mutation, j))
    .catch(error => console.log(error));
}

export async function fetchOne(endpoint) {
  // check local storage to see if the result is cached
  let cachedData = localStorage.getItem(endpoint)
  if (cachedData) {
    return Promise.resolve(JSON.parse(cachedData));
  }

  // return the json promise if not
  let res = await fetch(endpoint).then(res => res.json());
  localStorage.setItem(endpoint, JSON.stringify(res));
  return Promise.resolve(res);
}

export async function fetchMultiple(endpoints) {
  let promises = endpoints.map(e => fetchOne(e));
  let responses = await Promise.all(promises);
  return Promise.resolve(responses);
}

export const createFilter = (items) => ({items, selectedIndex: -1});
