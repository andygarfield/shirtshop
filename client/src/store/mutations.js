import { createFilter, removeArrayIndex, storeCart } from '../helpers';

export default {
  // should only be run at app initialization
  fillProductLookup(state) {
    state.products.forEach((product, i) => state.productLookup[product.product_id] = i);
  },

  // pustToCart adds an item to the shopping cart
  pushToCart(state, data) {
    // check to see if the item already exists
    let possibleMatches = [];
    state.cart.forEach((item, i) => {
      if (item.id === data[0]) {
        possibleMatches.push(i);
      }
    })

    let matchFound = false;
    if (possibleMatches.length > 0) {
      possibleMatches.forEach(i => {
        // loop through the matches and see if the the other attributes match
        let sizeSame = data[2] === state.cart[i].size;
        let colorSame = data[3] === state.cart[i].color;
        if (sizeSame && colorSame) {
          // if everything matches, increase the quantity
          state.cart[i].quantity++;
          matchFound = true;
        }
      })
    }
    // with any other condition, it's new, and we should add it to the cart
    if (!matchFound) {
      state.cart.push({
        id: data[0],
        name: data[1],
        size: data[2],
        color: data[3],
        price: data[4],
        quantity: 1
      });
    }

    storeCart(state.cart);
  },

  // filterProducts takes ids and only stores matching ids in state.products
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

  // create the departments filter with the category filter embedded inside
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

  // change the currect department filter
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

  toggleLoggedIn(state) {
    state.loggedIn = !state.loggedIn;
  },

  saveProducts(state, res) {
    state.products = res;
  },

  setPage(state, page) {
    state.page = page;
  },

  getCartFromLocalStorage(state) {
    state.cart = JSON.parse(localStorage.getItem('cart'));
  },

  removeFromCart(state, cartIndex) {
    state.cart = removeArrayIndex(state.cart, cartIndex);
    storeCart(state.cart);
  },
  
  clearCart(state) {
    state.cart = [];
    storeCart(state.cart);
  },

  setCurrentProduct(state, product) {
    state.currentProduct = product;
  },

  selectCategory(state, categoryIndex) {
    // reset the page we're on while we're at it
    state.page = 1;
    state.categories.selectedIndex = categoryIndex;
  },

  saveCurrentSizes(state, sizes) {
    state.currentSizes = sizes;
  },

  saveCurrentColors(state, colors) {
    state.currentColors = colors;
  },


}