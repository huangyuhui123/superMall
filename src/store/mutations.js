import {ADD_COUNTER,ADD_TO_CART} from './mutation-types'

export default {
    //mutations唯一的目的就是修改state的状态，
    //mutations中的每个方法尽可能完成的事件比较单一，像这种又修改商品数量，又添加商量类型的负杂点的一般用action
    // addCart(state,payload){
    //    /*  let oldProduct = null;
    //     for(let item of state.cartList){
    //         if(item.id === payload.id){
    //             oldProduct = item;
    //         }
    //     } */
    //     let product = state.cartList.find(item=>item.id==payload.id)
    //     if(product){
    //         product.count+=1
    //     }else{
    //         payload.count =1;
    //         state.cartList.push(payload)
    //     }
    // }
    // addCounter(state,payload){
    //     payload.count++;
    // },
    // addToCart(state,payload){  
    //     state.cartList.push(payload)
    // }
    //更换为为常量
     [ADD_COUNTER](state,payload){
         payload.count++;
     },
     [ADD_TO_CART](state,payload){  
         state.cartList.push(payload)
     }

}