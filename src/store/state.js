import { createFilter } from '../helpers';

export default {
  loggedIn: false,
  products: [],
  page: 1,
  departments: createFilter([]),
  categories: createFilter([])
}