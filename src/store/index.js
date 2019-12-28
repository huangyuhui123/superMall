<<<<<<< HEAD
import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex);

const state ={
    cartList:[]
}

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})


//3 挂在
=======
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
>>>>>>> c1f7ce4a398c5df2f8c85fec38de58fb071fdf80
export default store