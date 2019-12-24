<template>
  <div class="shop-info">
    <div class="shop-top">
        <img :src="shop.logo" alt="">
         <span class="title">{{shop.name}}</span>
    </div>
    <div class="shop-middle">
        <div class="shop-middle-item shop-middle-left">
            <div class="info-sells">
                <div class="sells-count">
                    {{shop-sells|sellCountFilter}}
                </div>
                <div class="sells-text">
                    总销量
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
	export default {
    name: "DetailShopInfo",
    props:{
        shop:{
            type:Object,
            default(){
                return{}
            }
        }
    }


	}
</script>

<style scoped>
 
</style>