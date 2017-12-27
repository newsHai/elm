<template>
  <transition name="fade">
      <div class="food" v-show="showFlag">
          <div class="food-content">
              <div class="img-header">
                  <img :src="food.image" alt=""/>
                  <div class="back" @click="hide">
                      <i class="icon iconfont icon-xiaoyuhao"></i>
                  </div>
              </div>
              <div class="content">
                  <h3 class="title">{{food.name}}</h3>
                  <div class="detail1">
                      <span class="sell-count">月售{{food.sellCount}}</span>
                      <span class="rating">好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                      <span class="now1">￥{{food.price}}</span>
                      <span class="old" v-show="food.oldPrice !== ''">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="carControl-wrapper">
                      <cart :con="food" v-show="isOk"></cart>
                      <div class="buy">
                          加入购物车
                      </div>
                  </div>
              </div>
              <div class="split"></div>
          </div>
      </div>
  </transition>
</template>

<script>
import cart from '@/components/cartControl'
export default {
    data(){
        return {
            showFlag:false,
            isOk:false
        }
    },
    methods:{
        show(){
            this.showFlag = true;
        },
        hide(){
            this.showFlag = false;
        }
    },
    props:['food'],
    components:{
        cart
    }
}
</script>

<style lang="less">
    .food{
        position: fixed;
        background-color: #fff;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;    
    }
    .food-content{
        .img-header{
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 100%;
            img{
                position: absolute;
                left: 0;
                top:0;
                width: 100%;
            }
            .back{
                position: absolute;
                top:0.2rem;
                left:0;
                .icon-xiaoyuhao{
                    display: block;
                    padding: 10px;
                    font-size: 20px;
                    color: #fff;
                }
            }
        }
        .content{
            position: relative;
            padding:0.36rem;
            text-align: left;
            .title{
                line-height: 0.28rem;
                margin-bottom:0.16rem;
                font-size: 0.28rem;
                font-weight: 700;
                color:#07111b;
            }
            .detail1{
                margin-top: 0.36rem;
                line-height: 0.2rem;
                height: 0.2rem;
                margin-bottom: 0.18rem;
                .sell-count{
                    margin-right: 0.24rem;
                }
                .rating{
                    padding-top: 0.36rem;
                } 
            }
            .price{
                line-height: 0.28rem;
                .now1{
                    margin-right: 0.16rem;
                    font-size: 0.28rem;
                    color: #f01414;
                }
            }
        }
    }
</style>
