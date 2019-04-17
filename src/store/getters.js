const ItemsPerPage = 9;

export default {
  productsInView(state) {
    let start = (state.page - 1) * ItemsPerPage;
    let end = state.page * ItemsPerPage;
    return state.products.slice(start, end);
  },
  pageCount(state) {
    return Math.ceil(state.products.length / ItemsPerPage);
  }
}