<template>
  <div class="goods">
    <good-list-item v-for="(item,index) in goods" :key="index" :product="item">
           
    </good-list-item> 
  </div>
</template>

<script>
import GoodListItem from './GoodListItem'
	export default {
        name: "GoodList",
        props:{
            goods:{
                type:Array,
                default(){
                    return[]

                    
                }
            }
        },
        components:{
            GoodListItem
        }
	}
</script>

<style scoped>
 .goods{
     display: flex;
     flex-wrap: wrap;   /*设置一行2个,给子元素设置宽度+wrap*/
     justify-content: space-around;
 }
</style>
