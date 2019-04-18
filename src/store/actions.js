import { fetchOne, fetchMultiple } from '../helpers';

export default {
  // getProducts fetches all the product data
  async getProducts({commit}) {
    commit('saveProducts', await fetchOne('/products'));
  },

  // getFilters gets the department and category filters from the database.
  // This should only needed to be run on the app initialization
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

  // getProductsByDepartment gets the products with a department of
  // `deptID` and filters the products in the view by them. When deptID
  // is -1, all filters are reset.
  async getProductsByDepartment({state, commit, dispatch}, deptID) {
    // set the department ID to change the selected filter button
    commit('selectDepartment', deptID);

    // if the deptID is `-1` the filter is turned off 
    if (deptID === -1) {
      dispatch('getProducts');
      return;
    }

    // otherwise, fetch all the categories in the department
    let categories = state.departments.items[deptID]
      .categories.map(
        c => `/products/category/${c.category_id}`
      );
    
    let responses = await fetchMultiple(categories);

    // only select the product IDs from the response and send them to the
    // filterProducts mutation
    let filteredIDs = [];
    responses.forEach(r => {
      filteredIDs = filteredIDs.concat(r[0].map(i => i.product_id));
    });
    commit('filterProducts', filteredIDs);
  },

  // getProductsByCategory gets the products with a category of `categoryID`
  // and filters the products in the view by them. When categoryID is -1, the
  // filter for the current department is used.
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