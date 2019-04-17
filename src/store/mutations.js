import { createFilter } from '../helpers';

export default {
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
}