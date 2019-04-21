import { createFilter, removeArrayIndex } from '../helpers';

export default {
  toggleLoggedIn(state) {
    state.loggedIn = !state.loggedIn;
  },

  saveProducts(state, res) {
    state.products = res;
  },

  setPage(state, page) {
    state.page = page;
  },

  pushToCart(state, data) {
    // check to see if the item already exists
    let matchPositions = [];
    state.cart.forEach((item, i) => {
      if (item.id === data[0]) {
        matchPositions.push(i);
      }
    })

    let foundMatch = false;
    matchPositions.forEach(i => {
      // loop through the matches and see if the the other attributes match
      let sizeSame = data[2] === state.cart[i].size;
      let colorSame = data[3] === state.cart[i].color;
      if (sizeSame && colorSame) {
        // if everything matches, increase the quantity
        state.cart[i].quantity++;
        foundMatch = true;
      }
    })

    // with any condition, it's new, and we should add it to the cart
    if (!foundMatch) {
      state.cart.push({
        id: data[0],
        name: data[1],
        size: data[2],
        color: data[3],
        quantity: 1
      });
    }
  },

  removeFromCart(state, cartIndex) {
    state.cart = removeArrayIndex(state.cart, cartIndex);
  },

  filterProducts(state, ids) {
    let products = JSON.parse(sessionStorage.getItem('/api/products'));
    state.products = products.filter(p => {
      if (ids.includes(p.product_id)) {
        return true;
      } else {
        return false;
      }
    });
  },

  setCurrentProduct(state, product) {
    state.currentProduct = product;
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
  },

  saveCurrentSizes(state, sizes) {
    state.currentSizes = sizes;
  },

  saveCurrentColors(state, colors) {
    state.currentColors = colors;
  },

  // should only be run at app initialization
  fillProductLookup(state) {
    state.products.forEach((product, i) => state.productLookup[product.product_id] = i);
  }
}