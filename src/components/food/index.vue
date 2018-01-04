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
                    </div>
                    <div class="buy">加入购物车</div>
                </div>
                <div class="split"></div>
                <div class="info">
                    <h3 class="title">商品信息</h3>
                    <p class="text">{{food.info}}</p>
                </div>
                <div class="split"></div>
                <div class="rating">
                    <h3 class="title">商品评价</h3>
                    <ratingselect :ratings="food.ratings" @increment="incrementTotal"></ratingselect>
                    <div class="rating-wrapper">
                        <ul>
                            <li v-for="rating in food.ratings" class="rating-item">
                               <div class="user">
                                   <span class="name">{{rating.username}}</span>
                                   <img :src="rating.avatar" alt="" width="12" height="12"/>
                                </div> 
                               <div class="time">{{rating.rateTime | formatDate}}</div>
                               <p class="text">
                                   <i class="icon iconfont" :class="{'icon-zan':rating.rateType === 0,'icon-cai':rating.rateType === 1}"></i>
                                   {{rating.text}}
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import cart from '@/components/cartControl'
import BScroll from 'better-scroll'
import ratingselect from '@/components/ratingselect'
import {formatDate} from '@/common/js/date.js'
const ALL = 2;
export default {
    data(){
        return {
            showFlag:false,
            isOk:false,
            selectType: ALL,
            onlyContent: true
        }
    },
    methods:{
        show(){
            this.showFlag = true;
            this.$nextTick(() => {
                if(!this.scroll){
                    this.scroll = new BScroll(this.$el, {
                        click:true
                    })
                }
            })
        },
        hide(){
            this.showFlag = false;
        },
        incrementTotal(){
            
        }
    },
    filters:{
        formatDate(time){
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
    },
    props:['food'],
    components:{
        cart,
        ratingselect
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
        bottom: 0.96rem;  
        
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
                height:100%;
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
            .carControl-wrapper{
                position: absolute;
                right: 0.5rem;
                bottom: 0.5rem;
                
            }
            .buy{
                position: absolute;
                right: 0.36rem;
                bottom: 0.36rem;
                z-index: 10;
                height: 0.48rem;
                line-height: 0.48rem;
                padding:0 0.24rem;
                border-radius: 12px;
                font-size: 0.2rem;
                color: #fff;
                background-color: #00a0dc;
            }
        }
        .info{
            padding: 0.36rem;
            .title{
                text-align: left;
                padding-left: 0.16rem;
                margin-bottom: 0.12rem;
            }
            .text{
                font-size: 0.24rem;
                line-height: 0.48rem;
                padding: 0 0.16rem;
                color: #4d555d;
                text-align: left ;
            }
        }
        .rating{
            text-align: left;
            padding-top: 0.36rem;
            .title{
                line-height: 0.28rem;
                margin-left: 0.36rem;
                font-size: 0.28rem;
                color: #07111b;
            }
            .rating-wrapper{
                padding:0 0.36rem;
                .rating-item{
                    padding:0.32rem 0;
                    position: relative; 
                    border-bottom:1px solid #f2f2f3; 
                    .user{
                        position: absolute;
                        right: 0;
                        top: 0.32rem;
                        line-height: 0.24rem;
                        img{
                            border-radius:50%;
                        }
                    }
                    .time{
                        margin-bottom: 0.12rem;
                        line-height: 0.24rem;
                        font-size: 0.2rem;
                        color: #93999f;
                    }
                    .text{
                        line-height: 0.32rem;
                        font-size: 0.24rem;
                        color: #07111b;
                        .icon{
                            margin-right: 0.08rem;
                            line-height: 0.32rem;
                            font-size: 0.24rem;
                            &.icon-zan{
                                color: #00a0dc;
                            }
                            &.icon-cai{
                                color: #93999f;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
