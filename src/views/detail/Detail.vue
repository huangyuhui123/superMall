<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav">
    </detail-nav-bar>
    <com-scroll class="content"  ref="detailscroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo"></detail-param-info>
    </com-scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'

import ComScroll from "components/common/scroll/ComScroll";

import  {getDetail,Goods,Shop,GoodsParam} from 'network/detail'
	export default {
    name: "Detail",
    data(){
      return{
        id:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{}
      }
    },
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      ComScroll,
      DetailGoodsInfo,
      DetailParamInfo
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
        //4. 获取商品详情数据
        this.detailInfo = data.detailInfo
        //5.获取参数
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      })

      
    },
    methods:{
      imageLoad(){
        this.$refs.detailscroll.refresh();
      }
    }
 

	}
</script>

<style scoped>
 #detail{
   position:relative;
   z-index:9;
   background-color:#fff;
   height:100vh;
 }
 .detail-nav{
   position:relative;
   z-index:9;
   background-color:#fff;
 }
 .content{
   height: calc(100% - 44px) ;
 }
 
</style>
