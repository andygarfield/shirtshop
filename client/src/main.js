import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import './plugins/vuetify';
import 'vuetify/dist/vuetify.min.css';
import App from './App.vue';
import router from './router';
import state from './store/state';
import getters from './store/getters';
import mutations from './store/mutations';
import actions from './store/actions';

Vue.use(Vuetify);
Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
