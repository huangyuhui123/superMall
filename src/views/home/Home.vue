<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend :recommend="recommend"></home-recommend>
    <feature-view></feature-view>
    <tab-control
      class="tab-control"
      :title="['流行', '新款', '精选']"
      @tabClick="tabType"
    ></tab-control>
    <goods-list :goods="goods[currentType].list" ></goods-list>
    <ul>
      <li>erere</li>
      <li>dfdfdfd</li>
      <li>dfdfdfd</li>
      <li>dfdfdfd</li>
      <li>dfdfdfd</li>
      <li>dfdfdfd</li>
      <li>dfdfdfd</li>
      <li>dfdfdfd</li>
      <li>dfdfdfd</li>
      <li>dfdfdfd</li>
      <li>dfdfdfd</li>
      <li>dfdfdfd</li>
      <li>dfdfdfd</li>
      <li>dfdfdfd</li>
    </ul>
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


export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    FeatureView,
    TabControl,
    GoodsList
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
      currentType:'pop'
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
    }          


  }
};
</script>

<style scoped>
#home {
  padding-top: 44px;
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
  z-index:9;
}
</style>
