<template>
    <div class="header">
        <div class="content_wrapper">
            <div class="avatar">
                <img :src="seller.avatar" alt="">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">
                        {{seller.name}}
                    </span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div class="support">
                    <span class="icon decrease"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
                <div class="supports-count" @click="show()">
                    5个 >
                </div>
            </div>
        </div>
        <div class="bulletin-wrapper" @click="show()">
            <span class="bulletin-title"></span>
            <span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-zuoyoujiantou">></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" alt=""/>
        </div>
        <transition name="fade">
            <div class="detail" v-show="isOk" @click="hide">
                <div class="detail-wrapper clearFix">
                    <h2>{{seller.name}}</h2>
                </div> 
                <div class="title">
                    <div class="line"></div>
                    <div class="text">优惠信息</div>
                    <div class="line"></div>
                </div>
                <ul class="supports">
                    <li v-for="(item, index) in seller.supports" class="support-item">
                        <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                        <span class="text">{{item.description}}</span>
                    </li>
                </ul>
                <div class="title">
                    <div class="line"></div>
                    <div class="text">商家公告</div>
                    <div class="line"></div>
                </div>
                <div class="bulletin">
                    <p class="content">
                        {{seller.bulletin}}
                    </p>
                </div>
            </div>
        </transition>
        
    </div>
</template>

<script>
export default {
    data(){
        return {
            isOk:false
        }
    },
    methods:{
        show(){
            this.isOk = true;
        },
        hide(){
            this.isOk = false;
        }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    props:['seller']
}
</script>

<style lang="less">
    .header{
        position: relative;
        color: #fff;
        overflow: hidden;
        background-color: rgba(7,17,27,.5);
    }
    .content_wrapper{
        position: relative;
        overflow: hidden;
        padding:0.48rem 0.24rem 0.36rem 0.48rem;
        .avatar{
            float: left;
            width: 1.28rem;
            height: 1.28rem;
            img{
                width: 100%;
            }
        }
        .content{
            float: left;
            margin-left: 0.32rem;
            .title{
                overflow: hidden;
                margin-bottom: 0.16rem;
                .brand{
                    float: left;
                    width: 0.6rem;
                    height: 0.36rem;
                    background-image:url(./images/brand@2x.png);
                    background-size: 100% 100%;
                }
                .name{
                    float: left;
                    margin-left: 0.12rem;
                    font-size: 0.32rem;
                    color:#fff;
                    font-weight: bold;
                    margin-top: -0.04rem;
                }
            }
            .description{
                color:#fff;
                text-align: left;
                margin-bottom: 0.2rem;
            }
            .support{
                .decrease{
                    float: left;
                    width: 0.24rem;
                    height: 0.24rem;
                    background:url(./images/decrease_1@2x.png);
                    background-size: 100% 100%;
                }
                .text{
                    float: left;
                    color: #fff;
                    margin-left: 0.2rem;
                    margin-top: -0.04rem;
                }
            }
            .supports-count{
                position: absolute;
                right: 0.2rem;
                bottom: 0.2rem;
                line-height: 0.48rem;
                background-color: rgba(0,0,0,.2);
                border-radius: 0.24rem;
                padding:0 0.16rem;
                color: #fff;
                font-size: 0.2rem;
            }
        }
    }
    .bulletin-wrapper{
        position: relative;
        background-color: rgba(7,17,27,.2);
        height: 0.56rem;
         line-height: 0.56rem;
        padding:0 0.44rem 0 0.24rem;
        overflow: hidden;
        white-space: normal;
        text-overflow: ellipsis;
        .bulletin-title{
            display: inline-block;
            width: 0.44rem;
            height: 0.24rem;
            background-image: url(./images/bulletin@2x.png);
            background-size: 100% 100%;
            margin-top: 0.1rem;
        }
        .bulletin-text{
            vertical-align:top;
            color: #fff;
        }
        .icon-zuoyoujiantou{
            position: absolute;
            right:0.2rem;
            top:0;
            color:#fff;
            font-size: 0.3rem;
        }
    }
    .background{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        filter: blur(10px); 
        img{
            width:100%;
            height: 100%;
        }
    }
    .detail{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background:rgba(7,17,27,.8);
        z-index: 51;
        .detail-wrapper{
            padding-top: 1.28rem;
            h2{
                color:#fff;
                font-size: 0.32rem;
                margin-bottom: 0.36rem;
            }
        }
        .title{
            width: 80%;
            margin: 0.56rem auto 0;
            display: flex;
            .line{
                position: relative;
                top: -0.12rem;
                flex: 1;
                border-bottom: 1px solid rgba(255,255,255,0.2)
            }
            .text{
                font-size: 0.32rem;
                padding:0 0.24rem;
                color: #fff;
            }
        }
        .supports{
            width: 80%;
            margin: 0.44rem auto;
            .support-item{
                padding: 0 0.24rem;
                margin-bottom: 0.24rem;
                text-align: left;
                .icon{
                    display: inline-block;
                    width: 0.32rem;
                    height: 0.32rem;
                    vertical-align: top;
                    margin-right: 0.12rem;
                    background-size: 100% 100%;
                    &.decrease{
                        background-image:url(./images/decrease_1@2x.png)
                    }
                    &.discount{
                        background-image:url(./images/discount_1@2x.png)
                    }
                    &.special{
                        background-image:url(./images/special_1@2x.png)
                    }
                    &.invoice{
                        background-image:url(./images/invoice_1@2x.png)
                    }
                    &.guarantee{
                        background-image:url(./images/guarantee_1@2x.png)
                    }
                }
                .text{
                    color:#fff;
                }
            }
        }
        .bulletin{
            width: 80%;
            margin:0.44rem auto;
            .content{
                padding: 0 0.24rem;
                line-height: 0.48rem;
                font-size: 0.24rem;
                color:#fff;
                text-align: left;
            }
        }
        &.fade-enter-active{
            animation: bounce-in .5s;
        }
        &.fade-leave-active{
            animation: bounce-out .5s;
        }
        @keyframes bounce-in {
            0% {
                transform: scale(0);
            }
            50% {
                transform: scale(1.5);
            }
            100% {
                transform: scale(1);
            }
        }
        @keyframes bounce-out {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.5);
            }
            100% {
                transform: scale(0);
            }
        }
    }
    
</style>
