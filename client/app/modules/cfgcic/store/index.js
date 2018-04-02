import { GET_DATAS,REMOVE ,SET_DIALOG} from './types';
import { each, find, assign, remove, isArray } from 'lodash';


const state = {
  cicCfgLst: [],
  total :0,
  dialog: false,
};

const mutations = {
  [GET_DATAS](state, response) {
    state.cicCfgLst.splice(0);
    state.cicCfgLst.push(...response.data);
    state.total = response.total;
  },

  [SET_DIALOG](state, flag) {
    state.dialog = flag;
  },

  [REMOVE](state, model) {
    state.cicCfgLst = state.cicCfgLst.filter(item => item._id != model._id);
    state.total -= 1;
  }
};

import * as getters from './getters';
import * as actions from './actions';

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
