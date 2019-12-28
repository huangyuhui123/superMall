<template>
  <div id="tab-bar-item" @click="itemClick">
    <div class="item-icon" v-if="!isActive">
      <slot name="icon"></slot>
    </div>
   <div class="item-active-icon" v-show="isActive"><slot name="active-icon"></slot></div>
    <div class="item-text" :style="aciveStyle">
      <slot name="text"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabBarItem",
  props:{
      	link: {
				type: String,
        required: true
      }
  },
  data(){
      return{

      }
  },
  computed:{
      isActive(){
          return this.$route.path.indexOf(this.link)!==-1
      },
      aciveStyle(){
          return this.isActive? {color: 'red'} : {}
      }
  },
  methods:{
      itemClick(){
          this.$router.push(this.link)
      }
  }
};
</script>
<style scoped>
#tab-bar-item {
    flex: 1;
  }

  .item-icon img, .item-active-icon img {
    width: 24px;
    height: 24px;
    margin-top: 5px;
    vertical-align: middle;
  }

  .item-text {
    font-size: 12px;
    margin-top: 3px;
    color: #333;
  }
</style>