// fetchOne fetches data from and endpoint string
// and caches the result in sessionStorage
export async function fetchOne(endpoint) {
  // check local storage to see if the result is cached
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

// createFilter creates an unselected filter from an array of objects 
export const createFilter = (items) => ({items, selectedIndex: -1});
