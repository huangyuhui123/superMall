<template>
  <div id="detail">
    <detail-nav-bar :id="id">
    </detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'

import  {getDetail,Goods,Shop} from 'network/detail'
	export default {
    name: "Detail",
    data(){
      return{
        id:null,
        topImages:[],
        goods:{},
        shop:{}
      }
    },
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo
    },
    created(){
      this.id = this.$route.params.id;

      //根绝iid获取详情页数据
      getDetail(this.id).then(res=>{
        //获取顶部图片轮播数据
        const data = res.result
        this.topImages = data.itemInfo.topImages;
        //2.获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        //3.获取店铺的信心
        this.shop = new Shop(data.shopInfo)
      })

      
    }
 

	}
</script>

<style scoped>
 
</style>
