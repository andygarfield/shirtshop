import { fetchOne, fetchMultiple } from '../helpers';

export default {
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