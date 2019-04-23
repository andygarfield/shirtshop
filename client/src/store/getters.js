const ItemsPerPage = 9;

export default {
  // productsInView finds the products that need to be displayed
  productsInView(state) {
    let start = (state.page - 1) * ItemsPerPage;
    let end = state.page * ItemsPerPage;
    return state.products.slice(start, end);
  },

  // pageCount is the number of pages needed to display all the products
  pageCount(state) {
    return Math.ceil(state.products.length / ItemsPerPage);
  },

  // cartCount counts the quantity of items in the shopping cart
  cartCount(state) {
    let totalCount = 0;
    state.cart.forEach(i => {totalCount += i.quantity});
    return totalCount
  },

  // subtotal is the pending total price
  subtotal(state) {
    let st = 0;
    state.cart.forEach(i => {
      st += i.price * i.quantity
    })

    return st;
  }
}