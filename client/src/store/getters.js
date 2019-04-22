const ItemsPerPage = 9;

export default {
  productsInView(state) {
    let start = (state.page - 1) * ItemsPerPage;
    let end = state.page * ItemsPerPage;
    return state.products.slice(start, end);
  },

  pageCount(state) {
    return Math.ceil(state.products.length / ItemsPerPage);
  },

  cartCount(state) {
    let totalCount = 0;
    state.cart.forEach(i => {totalCount += i.quantity});
    return totalCount
  },

  subtotal(state) {
    let st = 0;
    state.cart.forEach(i => {
      st += i.price * i.quantity
    })

    return st;
  }
}