<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <com-scroll class="content"  ref="homescroll" :probe-type="3" @scroll="contentScroll"  :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners"></home-swiper>
      <home-recommend :recommend="recommend"></home-recommend>
      <feature-view></feature-view>
      <tab-control class="tab-control" :title="['流行', '新款', '精选']" @tabClick="tabType"></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </com-scroll>
    <!-- 添加native修饰符，监听组件根源上的原生事件 -->
    <back-top @click.native="backClick" v-show="isShowBsckTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import { getHomeMultidata, getHomeGoods } from "network/home";

import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommend from "./childComps/HomeRecommend";
import FeatureView from "./childComps/FeatureView";

import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goods/GoodList";

import ComScroll from "components/common/scroll/ComScroll";
import BackTop from "components/content/backtop/BackTop"



export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    FeatureView,
    TabControl,
    GoodsList,
    ComScroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: []}
      },
      currentType:'pop',
      isShowBsckTop:false
    };
  },
  created() {
    //请求多个数据
    this.getHomeMultidataMethod();
    //2请求商品数据
    this.getHomeGoodsMethod('pop');
    this.getHomeGoodsMethod('new');
    this.getHomeGoodsMethod('sell')
   
  },
  methods: {
    //网络请求相关方法
    //这里处理业务逻辑
    getHomeMultidataMethod() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      });
    },
    getHomeGoodsMethod(type){
      const page = this.goods[type].page +1
       getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.homescroll.finishPullUp()
      });
    },

    //事件监听相关方法
    tabType(index){
      console.log(index)
      switch(index){
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
          break;
      }
    },
    backClick(){
      //1.直接在父组件中 调用子组件中scroll的方法,scroll 指的是data中的scroll
      //this.$refs.homescroll.scroll.scrollTo(0,0,500)

      //2.调用子组件中的方法
      this.$refs.homescroll.cScrollTo(0,0)
    },
    contentScroll(position){
      //console.log(position)
      this.isShowBsckTop = -position.y >1000? true :false
    },
    loadMore(){
      console.log("上拉加载更多")
      this.getHomeGoodsMethod(this.currentType)
    }        


  }
};
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh; 
 position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
/* 第一种方法，利用高度父100vh,  height: calc(100%-93px); */
/* .content {
  height: calc(100%-93px);
  overflow: hidden;
  margin-top:44px;
} */
/* 
   第二种利用定位
 */
 .content{
   position:absolute;
   overflow: hidden;
   top:44px;
   bottom:49px;
   left:0;
   right:0;
 }
</style>
