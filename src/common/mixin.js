import {debounce} from './utils'

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