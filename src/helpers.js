export function apiGet(commitFunc, endpoint, mutation) {
  fetch(endpoint)
    .then(response => response.json())
    .then(j => commitFunc(mutation, j))
    .catch(error => console.log(error));
}

export function createFilter(items) {return {items, selectedIndex: -1}}