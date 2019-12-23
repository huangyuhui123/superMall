<template>
  <div class="wrapper">
    <ul class="content">
      <li>{ 分类的类表1}</li>
      <li>{ 分类的类表1}</li>
      <li>{ 分类的类表1}</li>
      <li>{ 分类的类表1}</li>
      <li>{ 分类的类表1}</li>
      <li>{ 分类的类表1}</li>
      <li>{ 分类的类表1}</li>
      <li>{ 分类的类表1}</li>
      <li>{ 分类的类表1}</li>
      <li>{ 分类的类表1}</li>
      <li>{ 分类的类表1}</li>
      <li>{ 分类的类表1}</li>
      <li>{ 分类的类表1}</li>
      <li>{ 分类的类表1}</li>
      <li>{ 分类的类表1}</li>
      <li>{ 分类的类表1}</li>
      <li>{ 分类的类表1}</li>
      <li>{ 分类的类表1}</li>
      <li>{ 分类的类表1}</li>
      <li>{ 分类的类表1}</li>
      <li>{ 分类的类表1}</li>
      <li>{ 分类的类表1}</li>
      <li>{ 分类的类表1}</li>
      <li>{ 分类的类表1}</li>
      <li>{ 分类的类表1}</li>
      <li>{ 分类的类表1}</li>
      <li>{ 分类的类表1}</li>
      <li>{ 分类的类表1}</li>
      <li>{ 分类的类表1}</li>
      <li>{ 分类的类表1}</li>
      <li>{ 分类的类表1}</li>
    </ul>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Category",
  data(){
    return{
      scroll:null
    }
  },
  created() {},
  mounted() {
    let scroll = new BScroll(document.querySelector('.wrapper'),{})
  }
};
</script>

<style scoped>
.wrapper {
  height: 150px;
  background-color: red;
}
</style>
