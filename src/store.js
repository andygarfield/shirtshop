import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    products: []
  },
  mutations: {
    toggleLoggedIn(state) {
      state.loggedIn = !state.loggedIn;
    },
    saveProducts(state, res) {
      state.products = res.map(j => {
        j.image = "http://localhost:3000/product_images/" + j.image;
        return j;
      })
    }
  },
  actions: {
    getProducts({commit}) {
      fetch('http://localhost:3000/products')
        .then(response => {
          return response.json()
        })
        .then(j => {
          commit('saveProducts', j)
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
})
