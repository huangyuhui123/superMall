<template>
  <div >
    <Swiper>
        <swiper-item v-for="(item,index) in banners" :key="index"  >
            <a :href="item.link">
                <img :src="item.image" alt="" @load="imageLoad">
            </a>
        </swiper-item>
    </Swiper>
  </div>
</template>

<script>
  import { Swiper,SwiperItem} from 'components/common/swiper'
	export default {
        name: "HomeSwiper",
        data(){
            return{
                isLoad:false    
            }
        },
        props:{
            banners:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        components:{
            Swiper,
            SwiperItem
        },
        methods:{
            imageLoad(){
                //只需要监听到一次图片加载完成就可以，所以只发送一次事件就好
                if(!this.isLoad){
                    this.$emit('swiperImageLoad')
                    this.isLoad = true
                }
            }
        }
	}
</script>

<style scoped>
 
</style>
