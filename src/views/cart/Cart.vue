<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">
          购物车({{cartLength}})
          <!-- 购物车({{length}}) -->
      </div>
    </nav-bar>
    <!-- 购物车列表 -->
    <cart-list></cart-list>
    <!-- 底部导航 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartBottomBar from './childComps/CartBottomBar'

import CartList from './childComps/CartList';

import {mapGetters} from 'vuex'
	export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar
    },
    data(){
      return{

      }
    },
    computed:{
      //如果多处用计算属性的话,可以抽出来放在getters
      // cartLength(){
      //   return this.$store.state.cartList.length
      // }
     ...mapGetters(['cartLength','cartList'])
    //  ...mapGetters({
    //    length:'cartLength', //映射
    //    list:'cartList'
    //  })
    }
	}
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color:#fff;
  }
  .cart{
    height:100vh;
  }
</style>
