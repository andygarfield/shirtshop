import Vue from 'vue'
import Vuex from 'vuex'
import { fetchOne, fetchMultiple, createFilter } from './helpers';

Vue.use(Vuex);

const ItemsPerPage = 12;

export default new Vuex.Store({
  state: {
    loggedIn: false,
    products: [],
    page: 1,
    departments: createFilter([]),
    categories: createFilter([])
  },
  getters: {
    productsInView(state) {
      let start = (state.page - 1) * ItemsPerPage;
      let end = state.page * ItemsPerPage;
      return state.products.slice(start, end);
    },
    pageCount(state) {
      return Math.ceil(state.products.length / ItemsPerPage);
    }
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

    setPage(state, page) {
      state.page = page;
    },

    filterProducts(state, ids) {
      let products = JSON.parse(localStorage.getItem('products'));

      state.products = products.filter(p => {
        if (ids.includes(p.product_id)) {
          return true;
        } else {
          return false;
        }
      });
    },

    removeFilter(state) {
      state.products = JSON.parse(localStorage.getItem('products'));
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

      state.departments = createFilter(depts);
    },

    selectDepartment(state, deptIndex) {
      state.page = 1;
      state.departments.selectedIndex = deptIndex;
      if (deptIndex === -1) {
        state.categories = createFilter([])
      } else {
        state.categories = createFilter(
          state.departments.items[deptIndex].categories
        );
      }
    },

    selectCategory(state, categoryIndex) {
      state.page = 1;
      state.categories.selectedIndex = categoryIndex;
    }
  },
  actions: {
    async getProducts({commit}) {
      commit('saveProducts', await fetchOne('/products'));
    },

    async getFilters({commit}) {
      // define a filter and parse the json
      let reqs = [
        fetchOne('/departments'),
        fetchOne('/categories')
      ];

      // wait for all requests to get back and then send data to mutation
      let responses = await Promise.all(reqs);
      commit('saveDepartments', responses);
    },

    async getProductsByDepartment({state, commit}, deptID) {
      commit('selectDepartment', deptID);

      if (deptID === -1) {
        commit('removeFilter');
        return;
      }

      let categories = state.departments.items[deptID]
        .categories.map(
          c => `/products/category/${c.category_id}`
        );
      
      let responses = await fetchMultiple(categories);

      let filteredIDs = [];
      responses.forEach(r => {
        filteredIDs = filteredIDs.concat(r[0].map(i => i.product_id));
      });
      commit('filterProducts', filteredIDs);
    },

    async getProductsByCategory({state, commit, dispatch}, categoryID) {
      commit('selectCategory', categoryID);

      if (categoryID === -1) {
        dispatch('getProductsByDepartment', state.departments.selectedIndex)
        return;
      }

      let queryID = state.categories.items[state.categories.selectedIndex].category_id;

      let res = await fetchOne(
        `/products/category/${queryID}`
      );
      commit('filterProducts', res[0].map(i => i.product_id));
    }
  }
})
