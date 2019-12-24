<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control" :title="['流行', '新款', '精选']" @tabClick="tabType" ref="tabcontrol1" v-show="isTabFixed"></tab-control>
    <com-scroll class="content"  ref="homescroll" :probe-type="3" @scroll="contentScroll"  :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend :recommend="recommend"></home-recommend>
      <feature-view></feature-view>
      <tab-control  :title="['流行', '新款', '精选']" @tabClick="tabType" ref="tabcontrol2"  ></tab-control>
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
import BackTop from "components/content/backtop/BackTop";
import { debounce } from "common/utils";



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
      isShowBsckTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0
    };
  },
  created() {
    //请求多个数据
    this.getHomeMultidataMethod();
    //2请求商品数据
    this.getHomeGoodsMethod('pop');
    this.getHomeGoodsMethod('new');
    this.getHomeGoodsMethod('sell');
  },
  mounted(){
      //3.监听item中组件加载完成,
      const refresh = debounce(this.$refs.homescroll.refresh,500)

      this.$bus.$on('itemImageLoad',()=>{ 
         //没有进行防抖操作
        // this.$refs.homescroll.refresh()

        //对他进行防抖操作
         refresh();
      })

      //获取tabControl的offsetTop，组件是不可以获取offsetTop
      //所有的组件都一个$el属性，用于获取组件中的元素

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

        //完成上拉加载更多
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
      this.$refs.tabcontrol1.currentIndex = index;
      this.$refs.tabcontrol2.currentIndex = index;
    },
    backClick(){
      //1.直接在父组件中 调用子组件中scroll的方法,scroll 指的是data中的scroll
      //this.$refs.homescroll.scroll.scrollTo(0,0,500)

      //2.调用子组件中的方法
      this.$refs.homescroll.cScrollTo(0,0);
      this.$refs.homescroll.refresh()
    },
    contentScroll(position){
      // 1.判断backTop按钮是否显示
      this.isShowBsckTop = -position.y >1000? true :false
      // 2.决定tabControl是否吸顶
      this.isTabFixed =  - position.y> this.tabOffsetTop;
    },
    loadMore(){
      this.getHomeGoodsMethod(this.currentType)
    },
    //防抖操作
    // debounce(fun,delay){
    //   let timer = null;

    //   return function(...args){ //...args可以传入多个参数
    //     if(timer) clearTimeout(timer);
    //     timer = setTimeout(()=>{
    //       fun.apply(this,args)
    //     },delay)
    //   }
    // } 
    swiperImageLoad() {
      //console.log(this.$refs.tabcontrol2.$el.offsetTop)
      this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop;
    },
   


  },
  destroyed(){
    console.log("home destroyed")
  },
  /*activated(){
    console.log("22222")
    console.log('home activated',this.saveY);
    this.$refs.homescroll.cScrollTo(0,this.saveY,0); 
    this.$refs.homescroll.refresh();
  },
  deactivated(){
    
    this.saveY = this.$refs.homescroll.getScrollY();
    console.log('home deactivated',this.$refs.homescroll.getScrollY(),this.saveY)
  }*/ 
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

  /**在使用浏览器的原生滚动时，为了让导航不跟随一起滚动 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
/* .tab-control {  //通过sticky属性设置吸顶
  position: sticky;
  top: 44px;
  z-index: 9;
} */
/* .fixed{  //这样做吸顶，会出现2个bug，一个tabControl突然消失，因为脱离了文档流，二是scroll滚动是改变translate属性的，fixed后的translate依然是可以改变的
  position:fixed;
  top:44px;
  left:0;
  right:0;
  z-index:9
} */


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

/**吸顶覆盖层的 */
 .tab-control{
  position: relative;
  z-index:9;
}

</style>
