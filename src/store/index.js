import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        cartList:[]
    },
    mutations:{
        addCart(state,payload){
           /*  let oldProduct = null;
            for(let item of state.cartList){
                if(item.id === payload.id){
                    oldProduct = item;
                }
            } */
            let product = state.cartList.find(item=>item.id==payload.id)
            if(product){
                product.count+=1
            }else{
                payload.count =1;
                state.cartList.push(payload)
            }

        }
    }

})


//3 挂在
export default store