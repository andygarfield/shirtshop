import { createFilter } from '../helpers';

export default {
  // whether the user is logged in
  loggedIn: false,
  // array of product objects
  products: [],
  // used for finding a product in the product array
  productLookup: {},
  // the store cart
  cart: [],
  // a product selection
  currentProduct: {},
  // the current product's sizes
  currentSizes: [],
  // the current product's colors
  currentColors: [],
  // the page in the pagination
  page: 1,
  // the department filter
  departments: createFilter([]),
  // the category filter
  categories: createFilter([])
}