import { ADD_TO_CART,ADD_COUNTER} from './mutation-types'

export default {
    // addCart(context,payload){
    //     let product = context.state.cartList.find(item=>item.id==payload.id)
    //     if(product){
    //         product.count+=1
    //     }else{
    //         payload.count =1;
    //         context.state.cartList.push(payload)
    //     }
    // }

    //2.拆分成单一的方法
    // addCart(context,payload){
    //     console.log("paydddd",payload)
    //     let product = context.state.cartList.find(item=>item.id==payload.id)
    //     if(product){
    //         //product.count+=1
    //         //context.commit('addCounter',product)
    //         context.commit(ADD_COUNTER,product)
    //     }else{
    //         payload.count = 1;
    //         context.commit(ADD_TO_CART,payload);
    //     }
    // }

    //3.使用Promise
    addCart(context,payload){
       return new Promise((resolve,reject)=>{
        let product = context.state.cartList.find(item=>item.id==payload.id)
        if(product){
            //product.count+=1
            //context.commit('addCounter',product)
            context.commit(ADD_COUNTER,product)
            resolve('商品数量加1')
        }else{
            payload.count = 1;
            context.commit(ADD_TO_CART,payload);
            resolve('添加新商品到购物车')
        }
       })
    }

}
