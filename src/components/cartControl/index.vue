<template>
  <div class="cartControl">
        <transition name="fade">
            <div class="cart-decrease" v-show="con.num>0"  @click.stop.prevent="reduce">
                <transition name="inner">
                    <i class="icon iconfont icon-53 icon1 inner"></i>
                </transition>
            </div>
        </transition>
        <span class="cart-count" v-show="con.num > 0">{{con.num}}</span>
        <i class="icon iconfont icon-wuuiconxiangjifangda icon1" @click.stop.prevent="add($event)"></i>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
    methods:{
        add(event){
            if(!event._constructed){
                return
            }
            if(!this.con.num){
                Vue.set(this.con,'num',1)
            }else{
                this.con.num++;
            }
        },
        reduce(){
            this.con.num--;
        }
    },
    props:['con']
}
</script>

<style lang="less">
.cartControl{
    .cart-decrease{
        float: left;
        &.fade-enter-active, &.fade-leave-active {
            transition: all 0.4s linear
        }
        &.fade-enter, &.fade-leave-active {
            opacity: 0;
            transform: translate3d(24px, 0, 0);
        }
        .inner{
            line-height: 0.48rem;
            vertical-align: top;
            color: rgb(0, 160, 220, 0.2);
            margin-right: 0.12rem;
            &.inner-enter-active, &.inner-leave-active {
                transition: all 0.4s linear;
                transform: rotate(0);
            }
            &.inner-enter, &.inner-leave-active {
                opacity: 0;
                transform:  rotate(180deg);
            }
        }
    }
    
    .cart-count{
        float: left;
        font-size: 0.32rem;
        line-height: 0.48rem;
        width: 0.24rem;
        vertical-align: top;
        text-align: center;
        color: #93999f;
    }
    .icon-wuuiconxiangjifangda{
        float: left;
        margin-left: 0.12rem;

    }
}

</style>
