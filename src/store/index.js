import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

const state ={
    cartList:[]
}

const store = new Vuex.Store({
    state,
    mutations,
    actions
})


//3 挂在
export default store