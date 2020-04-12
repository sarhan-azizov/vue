import Vue from 'vue';
import Vuex from 'vuex';

import { modules } from '../components';

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
});
