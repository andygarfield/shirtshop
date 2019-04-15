export function apiGet(commitFunc, endpoint, mutation) {
  fetch(endpoint)
    .then(response => response.json())
    .then(j => commitFunc(mutation, j))
    .catch(error => console.log(error));
}

export function mapFromObjArray(array, usingKey) {
  let m = new Map();
  array.forEach(item => m.set(item[usingKey], item))
  
  return m;
}
