<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
      <!-- scroll中的button按钮无论是否设置click为true都可以点击，但是如果scroll中的div如果要点击，必须设置click为true -->
      <!-- <slot></slot> -->
  </div>
</template>

<script>
    import BScroll from 'better-scroll'
	export default {
        name: "ComScroll",
        props:{
            probeType:{
                type:Number,
                default:0
            },
            pullUpLoad:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return{
                scroll:null
            }
        },
        mounted(){
            this.scroll = new BScroll(this.$refs.wrapper,{
                click:true,
                probeType:this.probeType,  // 必须这属性设置为3可以监听实时滚动， 2，是监听实习和惯性滚动的位置
                pullUpLoad:this.pullUpLoad
            })
            //this.scroll.scrollTo(0,0)
            //2.监听滚动位置
            this.scroll.on('scroll',(position)=>{
                this.$emit('scroll',position)
            })
            //console.log(this.scroll)

            //3.监听上拉刷新加载更多
            if(this.pullUpLoad){
                 this.scroll.on('pullingUp',()=>{
                     console.log("滚动到底部")
                    this.$emit('pullingUp')
                })
            }
           
           // Better-scroll 在决定有多少区域可以滚动时，是根据scrollHeight属性来决定的，
           //scrollHeight是根据放better-scroll的content中的子组件的高度
           //但是我们的首页中，刚开始在计算scrollHeight属性时，是没有将图片计算在内的，所以计算出来的值是错误的（1300+）
           //后来图片加载进来之后有了新的高度，但是scrollHeight属性并没有进行更新，所以出现滚动有时候能滚，有时候滚不了
            //解决方法：
            //1.监听每一张图片是否加载完成，只要有一张图片加载完成了，就执行一次refresh()
            //2.如何监听图片加载完成
                //1.原生的js监听图片：img.onload = function(){}
                //2.Vue中监听： @load = "方法"
            //3.调用scrol.refresh()

            //4.对于refresh非常频繁的的问题，进行防抖操作
            //.防抖debounce/节流throttle

        },
        methods:{
            cScrollTo(x,y,time=300){
                //确定当scroll已经渲染完成才加载
               this.scroll&&this.scroll.scrollTo&& this.scroll.scrollTo(x,y,time)
            },
            finishPullUp(){
                this.scroll&&this.scroll.finishPullUp&&this.scroll.finishPullUp()
            },
            refresh(){
                
                this.scroll&&this.scroll.refresh&&this.scroll.refresh()
            }
        }
	}
</script>

<style scoped>
 
</style>

