<template>
  <div class="recommend" >
      <div class="recommend-item" v-for="(item,index) in recommend" :key="index">
          <a :href="item.link">
              <img :src="item.image" alt="">
              <div>{{item.title}}</div>
          </a>
      </div>
  </div>
</template>

<script>
  import { Swiper,SwiperItem} from 'components/common/swiper'
	export default {
        name: "HomeRecommended",
        props:{
            recommend:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        components:{

        }
	}
</script>

<style scoped>
 .recommend{
     display: flex;
     width:100%;
     text-align: center;
     font-size:12px;
     padding:15px 0 30px;
     border-bottom: 8px solid #eee;
 }
 .recommend-item{
     flex:1
 }
 .recommend-item img{
     width:65px;
     height:65px;
     margin-bottom:10px;
 }
</style>
