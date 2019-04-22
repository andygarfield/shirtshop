import { fetchOne, fetchMultiple } from '../helpers';

export default {
  // init runs a number of tasks on app initialization. It gets the products
  // and filters and fills the product lookup.
  async init({commit, dispatch}) {
    await Promise.all([
      dispatch('getProducts'),
      dispatch('getFilters')
    ])
    commit('fillProductLookup');
  },

  // getProducts fetches all the product data
  async getProducts({commit}) {
    commit('saveProducts', await fetchOne('/api/products'));
  },

  // getProduct gets one product and set
  async getProduct({state, commit, dispatch}, productID) {
    await dispatch('getProducts');
    commit(
      'setCurrentProduct',
      state.products[state.productLookup[productID]]
    );
  },

  // getFilters gets the department and category filters from the database.
  // This should only needed to be run on the app initialization
  async getFilters({commit}) {
    // define a filter and parse the json
    let reqs = [
      fetchOne('/api/departments'),
      fetchOne('/api/categories')
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
        c => `/api/products/category/${c.category_id}`
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
      `/api/products/category/${queryID}`
    );
    commit('filterProducts', res[0].map(i => i.product_id));
  },

  // getProductAttributes fetches a product's attributes from the API server
  async getProductAttributes({commit}, productID) {
    let attributes = await fetchOne(
      `/api/products/attributes/${productID}`
    );
    attributes = attributes[0];

    let sizes = [];
    let colors = [];
    attributes.forEach(attr => {
      if (attr.attribute_name === 'Color') {
        colors.push(attr);
      } else if (attr.attribute_name === 'Size') {
        sizes.push(attr);
      }
    });

    commit('saveCurrentSizes', sizes);
    commit('saveCurrentColors', colors);
  }
}