import {debounce} from './utils'
import BackTop from "components/content/backtop/BackTop";

import {BACKTOP_DISTANCE} from 'common/const.js'

export const itemListenerMixin = {
    //对象继承用混入， 类继承用extends
    data(){
        return{
            itemImgListener:null
        }
    },
    mounted(){
        //监听推荐组件中图片的加载完成
        const newRefresh = debounce(this.$refs.scroll.refresh,500)
  
        this.itemImgListener = ()=>{
          newRefresh()
        }
        this.$bus.$on('itemImageLoad',this.itemImgListener)

        //console.log("事件监听混入后的方法")
      },
}

export const BackTopMixin = {
  data(){
    return{
      isShowBsckTop:false
    }
  },
  components:{
    BackTop
  },
  methods:{
    backTop(){
      //1.直接在父组件中 调用子组件中scroll的方法,scroll 指的是data中的scroll
      //this.$refs.homescroll.scroll.scrollTo(0,0,500)

      //2.调用子组件中的方法
      this.$refs.scroll.cScrollTo(0,0);
      this.$refs.scroll.refresh()
    },
    listenershowback(position){
      //console.log(" 我是子组件调用",position,-position.y,BACKTOP_DISTANCE)
      this.isShowBsckTop = -position.y > BACKTOP_DISTANCE
      //console.log("this.isShowBsckTop ",this.isShowBsckTop )
    }
  }
}