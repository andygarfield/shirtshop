# State management
State is managed with the Vuex extension. When the app is first loaded, all of the products are fetched by the `getProducts` action, which fetches the data from the `/products` endpoint. The products are then given the correct image link.
