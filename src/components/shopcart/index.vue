<template>
  <div class="shopCart">
      <div class="content">
          <div class="content-left">
              <div class="logo-wrapper">
                  <div class="logo" :class="{'highlight': price > 0}">
                      <i class="icon iconfont icon-gouwuche1" :class="{'current': price > 0}"></i>
                  </div>
                  <div class="num" v-show="count > 0">{{count}}</div>
              </div>
              <div class="price" :class="{'current': price > 0}">￥{{price}}</div>
              <div class="desc" v-show="price > 0" :class="{'current': price > 0}">另需配送费￥4元</div>
          </div>
          <div class="content-right">
              <div class="pay" :class="payClass">
                  {{payDesc}}
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            price:0,
            count:0
        }
    },
    computed:{
        payClass(){
            return this.price > 20 ? 'enough' : 'not-enough'
        },
        payDesc(){
            if(this.price > 20){
                return '去结算'
            }else{
                return `还差￥${(20-this.price)}元起送`
            }
             
        }
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
                    margin:0 0.14rem 0 0.24rem;
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
    }
</style>
