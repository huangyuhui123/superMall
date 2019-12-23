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

            //3.监听上拉刷新
            this.scroll.on('pullingUp',()=>{
                this.$emit('pullingUp')
            })

        },
        methods:{
            cScrollTo(x,y,time=300){
                
                this.scroll.scrollTo(x,y,time)
            },
            finishPullUp(){
                this.scroll.finishPullUp()
            }
        }
	}
</script>

<style scoped>
 
</style>
