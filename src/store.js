import Vue from 'vue'
import Vuex from 'vuex'
import { mapFromObjArray, apiGet } from './helpers';
import { stat } from 'fs';

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    loggedIn: false,
    products: [],
    departments: [],
  },
  mutations: {
    toggleLoggedIn(state) {
      state.loggedIn = !state.loggedIn;
    },

    saveProducts(state, res) {
      let products = res.map(product => {
        product.image = "/product_images/" + product.image;
        return product;
      })

      localStorage.setItem('products', JSON.stringify(products));
      state.products = products;
    },

    saveDepartments(state, responses) {
      // create an array of categories for each department
      let categories = responses[1];
      let depts = responses[0].map(d => {
        d.categories = []
        return d;
      })

      let deptMap = {}
      depts.forEach((d, i) => {
        deptMap[d.department_id] = i
      })

      categories.forEach(
        c => depts[deptMap[c.department_id]].categories.push(c)
      );

      state.departments = depts;
      //let filters = {
      //  departments,
      //  categories
      //}
      //filters['departments'] = {depts, activeFilter: 0};
      //filters['categories'] = {categories, activeFilter: 0};

      //state.filters = filters;
    },

    //changeFilter(state, filterName, itemID) {
    //  state.filters[filterName] = itemID;
    //  let products = JSON.parse(localStorage.getItem('products'));
    //  if (itemID === 0) {
    //    // fetch from local storage and return
    //    state.products = products;
    //    return;
    //  }

    //  state.products = products.filter(
    //    product => product.display === deptID ? true : false
    //  );
    //}
  },
  actions: {
    getProducts({commit}) {
      // may collapse the function if there isn't a need for multiple calls
      apiGet(commit, '/products', 'saveProducts');
    },
    getFilters({commit}) {
      let parseJson = (endpoint) => fetch(endpoint).then(res => res.json())

      // define a filter and parse the json
      let deptsPromise = parseJson('/departments');
      let categoriesPromise = parseJson('/categories');

      // wait for all requests to get back and then send data to mutation
      Promise.all([
        deptsPromise,
        categoriesPromise
      ])
        .then(responses => commit('saveDepartments', responses))
        .catch(error => console.log(error))
    }
  }
})
