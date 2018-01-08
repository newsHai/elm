<template>
  <div class="shopCart">
      <div class="content" @click="toggleList()">
          <div class="content-left">
              <div class="logo-wrapper">
                  <div class="logo" :class="{'highlight': totalPrice > 0}">
                      <i class="icon iconfont icon-gouwuche1" :class="{'current': totalPrice > 0}"></i>
                  </div>
                  <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
              </div>
              <div class="price" :class="{'current': totalPrice > 0}">￥{{totalPrice}}</div>
              <div class="desc" v-show="totalPrice > 0" :class="{'current': totalPrice > 0}">另需配送费￥{{deliveryPrice}}元</div>
          </div>
          <div class="content-right">
              <div class="pay" :class="payClass">
                  {{payDesc}}
              </div>
          </div>
      </div>
      <transition name="fade">
        <div class="shopcart-list" v-show="listShow">
            <div class="list-header">
                <h3 class="title">购物车</h3>
                <span class="empty" @click="empty">清空</span>
            </div>
            <div class="list-content" ref="listContent">
                <ul>
                    <li class="shopcart-food" v-for="food in selectFoods">
                        <span class="name">{{food.name}}</span>
                        <div class="price">
                            <span>￥{{food.price*food.num}}</span>
                        </div>
                        <div class="cartcontrol-wrapper">
                            <cart :con="food"></cart>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
      </transition>
      <transition name="fade">
        <div class="list-mask" v-show="listShow"></div>
      </transition>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import cart from '@/components/cartControl'
export default {
    data(){
        return {
         fold: true
        }
    },
    props:{
        selectFoods:{
            type:Array,
            default(){
                return [{price:10,count:1}]
            }
        },
        minPrice:{
            type:Number,
            default:0
        },
        deliveryPrice:{
            type:Number,
            default:0
        }
    },
    computed:{
        payClass(){
            return this.totalPrice > 20 ? 'enough' : 'not-enough'
        },
        payDesc(){
            if(this.totalPrice === 0){
                return `${this.minPrice}元起送`;
            }else if(this.totalPrice < this.minPrice){
                var diff= this.minPrice - this.totalPrice;
                return `还差￥${diff}元起送`
            }else{
                return '去结算';
            }
        },
        totalPrice(){
            let total = 0;
            this.selectFoods.forEach((food) => {
                total += food.price * food.num
            });
            return total;
        },
        totalCount(){
            let count = 0;
            this.selectFoods.forEach((food) => {
                count += food.num
            });
            return count;
        },
        listShow(){
           
            if(!this.totalCount){
                this.fold = true;
                return false;
            }
            let show = !this.fold;
            if (show) {
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.listContent, {
                            click: true
                        });
                    } else {
                    this.scroll.refresh();
                    }
                });
            }
            return show;
        }
    },
    methods: {
        drop(el){
            // console.log(el);
            // this.count++
        },
        toggleList(){
           
            if(!this.totalCount){
                 
                return;
            }
            this.fold = !this.fold;
            
        },
        empty(){
            this.selectFoods.forEach((food) => {
                food.num = 0;
            })
        }
    },
    components:{
        cart
    }
}
</script>

<style lang="less">
    .shopCart{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        z-index: 50;
        height: 0.96rem;
        .content{
            display: flex;
            background:#141d27;
            height: 100%;
            .content-left{
                flex: 1;
                text-align: left;
                .logo-wrapper{
                    display: inline-block;
                    position: relative;
                    top: -0.2rem;
                    margin:0 0.14rem 0 0.1rem;
                    width: 1.12rem;
                    height: 1.12rem;
                    box-sizing:border-box;
                    vertical-align: top;
                    border-radius: 50%;
                    background:#141d27;
                    .logo{ 
                        width: 78%;
                        height: 78%;
                        text-align: center;
                        border-radius:50%;
                        background:#2b343c;
                        margin:0.1rem auto 0;
                        &.highlight{
                            background:#00a0dc
                        }
                        .icon{
                            font-size: 0.56rem;
                            color: #80858a;
                            line-height: 0.88rem;
                            &.current{
                                color: #fff;
                            }
                        }
                    }
                    .num{
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 0.48rem;
                        height: 0.48rem;
                        background: #f01414;
                        text-align: center;
                        line-height: 0.48rem;
                        color: #fff;
                        font-size: 0.12rem;
                        font-weight: 700;
                        border-radius: 50%;
                        box-shadow: 0 4px 8px rgba(0,0,0,0.4);
                    }
                }
                .price{
                   display: inline-block;
                    vertical-align: top;
                    margin-top: 0.24rem;
                    line-height: 0.48rem;
                    padding-right: 0.14rem;
                    box-sizing: border-box;
                    border-right: 1px solid rgba(255,255,255,0.1);
                    font-size: 0.32rem;
                    font-weight: 700;
                    color: rgba(255,255,255,0.4);
                }
                .desc{
                   display: inline-block;
                    vertical-align: top;
                    line-height: 0.36rem;
                    margin-left: 2.35rem;
                    color: rgba(255,255,255,0.4);
                    font-size: 0.2rem;
                    margin-top: -0.8rem;
                }
                .current{
                    color: #fff;
                    font-weight: 700;
                }
            }
            .content-right{
                width: 2.1rem;
                .pay{
                    height: 0.96rem; 
                    line-height: 0.96rem;
                    text-align: center;
                    color: rgba(255,255,255,.4);
                    font-size: 0.24rem;
                    background:#2b333b;
                    &.enough{
                        background: #00b43c;
                        color: #fff;
                    }
                    &.not-enough{
                        background:#2b333b;
                    }               
                }
            }
        }
        .shopcart-list{
            position: absolute;
            top:0;
            left: 0;
            width: 100%;
            text-align: left;
            z-index: -1;
            transform: translate3d(0, -100%, 0);
             &.fade-enter-active, &.fade-leave-active {
                transition: all 0.5s;
                transform: translate3d(0, -100%, 0);
            }
            &.fade-enter, &.fade-leave-active {
                transform: translate3d(0, 0, 0);
            }
            .list-header{
                height: 0.8rem;
                line-height: 0.8rem;
                padding: 0 0.36rem;
                background-color: #f3f5f7;
                border-bottom: 1px solid rgba(7,17,27,.1);
                .title{
                    float: left;
                    text-align: left;
                    font-size: 0.28rem;
                    color: #07111b;
                }
                .empty{
                    float: right;
                    font-size: 0.24rem;
                    color: #00a0dc;
                }
            }
            .list-content{
                padding: 0 0.36rem;
                max-height: 2.17rem;
                overflow: hidden;
                background-color: #fff;
                .shopcart-food{
                    position: relative;
                    padding: 0.24rem 0;
                    box-sizing:border-box;
                    .name{
                        line-height: 0.48rem;
                        font-size: 0.28rem;
                        color: #07111b;
                    }
                    .price{
                        position: absolute;
                        right: 1.8rem;
                        bottom: 0.24rem;
                        line-height: 0.48rem;
                        
                        font-weight: 700;
                        color: #f01414;
                        span{
                            font-size: 0.28rem;
                        }
                    }
                    .cartcontrol-wrapper{
                        position: absolute;
                        right: 0;
                        bottom: 0.24rem;
                    }
                }
            }
        }
        .list-mask{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: -2;
            background-color: rgba(7,17,27,0.6);
            &.fade-enter-active, &.fade-leave-active{
                opacity: 1;
                transition: all 0.5s;
                background-color: rgba(7,17,27,0.6);
            }
            &.fade-enter, &.fade-leave{
                opacity: 0;
                transition: all 0.5s;
                background-color: rgba(7,17,27,0);
            }
            
        }
    }
</style>
