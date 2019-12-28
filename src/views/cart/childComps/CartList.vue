<template>
  <div class="cart-list">
    <com-scroll class="content" ref="scroll">
          <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item">{{item}}</cart-list-item>
    </com-scroll>
  </div>
</template>

<script>
import ComScroll from 'components/common/scroll/ComScroll'

import CartListItem from './CartListItem'

import {mapGetters} from 'vuex';
	export default {
    name: "CartList",
    components:{
      ComScroll,
      CartListItem
    },
    computed:{
      ...mapGetters(['cartList'])
    },
    activated(){
        this.$refs.scroll.refresh()
    }

	}
</script>

<style scoped>
.cart-list{
  height: calc(100% - 44px - 49px - 40px);
  /* height:100%; */
}
 .content{
   /* height: calc(100% - 44px - 49px); */
   height:100%;
   overflow: hidden;
 }
</style>
