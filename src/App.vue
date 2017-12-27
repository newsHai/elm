<template>
  <div id="app">
    <top :seller="seller"></top>
    <div class="tab">
      <div class="tab_item">
        <router-link to="/">商品</router-link>
      </div>
      <div class="tab_item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab_item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import top from '@/components/header'
import data from '@/common/json/data.json'
export default {
  name: 'app',
  components:{
    top
  },
  data(){
    return {
      seller:{}
    }
  },
  created(){
    this.seller = data.seller
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.tab{
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  position : relative;
  &:after{
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    width: 100%;
    content: '';
  }  
  .tab_item{
    flex: 1;
    text-align: center;
    
    a{
      font-size: 0.28rem;
    }
  }
}
.split{
  width: 100%;
  height: 0.32rem;
  border-top: 1px solid rgba(1, 17, 27, 0.1);
  border-bottom: 1px solid rgba(1, 17, 27, 0.1);
  background-color: #f3f5f7;
}
</style>
