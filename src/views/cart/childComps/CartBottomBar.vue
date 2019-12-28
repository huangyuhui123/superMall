<template>
  <div class="bottom-bar">
    <div class="check-all" >
      <check-button class="check-button" 
        :is-checked="isSelectAll"
          @click.native="checkedAll"
        ></check-button>
      <span>全选</span>
    </div>
    <div class="price">合计：{{ totalPrice }}</div>
    <div class="calucate">结算{{ checkLength }}</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkbutton/CheckButton";

import { mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return (
        "￥" +
        //this.$store.state.cartList
        this.cartList
          .filter(item => item.checked)
          .reduce((preValue, item) => {
            return preValue + item.price.substring(1) * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      //return this.$store.state.cartList.filter(item => item.checked);
      return this.cartList.filter(item=>item.checked).length
    },
    isSelectAll(){
      //没有选中的长度取反，就是false,此项能不高，由于要选好循环
      //1. return !(this.cartList.filter(item=>!item.checked).length)
      // 2.if(this.cartList.length==0) return false
      // 2.return !this.cartList.find(item=>!item.checked)

      //3循环
      if (this.cartList.length==0) return false;
      for(let item of this.cartList){
        if(!item.checked ){
          return false
        }
      }
      return true
    
    }
  },
  methods:{
    checkedAll(){
      if(this.isSelectAll){ //全选
        this.cartList.forEach(item => item.checked = false);
      }else{//有一个没选或者全部未选中
        this.cartList.forEach(item=> item.checked = true)
      }

     // this.cartList.forEach(item=> item.checked = !this.isSelectAll)
     //这样简化后是有问题的，单选的属性和全选的属性会相互影响的
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  position: relative;
  display: flex;
}
.check-all {
  width: 60px;
  display: flex;
  height: 40px;
  align-items: center;
  margin-left: 10px;
}
.check-button {
  height: 20px;
  width: 20px;
  margin-right: 5px;
}
.price {
  line-height: 40px;
  margin-left: 30px;
  flex:1;
}
.calucate{
    line-height: 40px;
    width:100px;
    background-color: red;
    color:#fff;
    text-align:center;
}
</style>
