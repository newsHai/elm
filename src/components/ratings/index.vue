<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h3 class="score">{{seller.score}}</h3>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star class="star1" :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star class="star1" :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class="split"></div>
      <ratingselect :only-content="onlyContent" :selectType="selectType" :ratings="ratings" @increment="incrementTotal"></ratingselect>
      <div class="rating-wrapper">
        <ul>
            <li class="rating-item" v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)">
                <div class="avatar">
                  <img :src="rating.avatar" alt="" width="28" height="28">
                </div>
                <div class="content">
                  <h3 class="name">{{rating.username}}</h3>
                  <star :size="24" :score="rating.score"></star>
                  <p class="text">{{rating.text}}</p>
                  <div class="recommend" v-show="rating.recommend &&rating.recommend.length">
                    <i class="icon iconfont" :class="{'icon-zan':rating.rateType === 0}"></i>
                    <span class="item" v-for="item in rating.recommend" >{{item}}</span>
                  </div>
                  <div class="time">
                    {{rating.rateTime | formatDate}}
                  </div>
                </div>
            </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from '@/components/star';
import ratingselect from '@/components/ratingselect'
import {formatDate} from '@/common/js/date.js'
import data from '@/common/json/data.json';
import BScroll from 'better-scroll'
export default {
  data(){
    return {
      ratings:[],
      onlyContent:true,
      selectType:2,

    }
  },
  props:{
    seller:{
      type:Object
    }
  },
  methods: {
    incrementTotal(type,data){
      this[type] = data;
    },
    needShow(type, text){
      // 是否展示带有评语的评价
      if(this.onlyContent && !text){
          return false
      }
      if(this.selectType === 2){
          return true
      }else{
          return type = this.selectType;
      }
    }
  },
  created(){
    this.ratings = data.ratings
    this.$nextTick(() => {
       this.scroll = new BScroll(this.$el,{click:true});
    })
  },
  filters:{
    formatDate(time){
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  components:{
    star,
    ratingselect
  }
}
</script>

<style lang="less">
  .ratings {
    position: absolute;
    top: 3.48rem;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    
    .overview{
      display: flex;
      padding: 0.36rem 0 0.36rem 0.36rem;
      .overview-left{
        float: left;
        width: 3.6rem;
        border-right:1px solid rgba(7,17,27,.1);
        padding: 0.12rem 0;
        .score{
          font-size: 0.48rem;
          line-height: 0.56rem;
          margin-bottom: 0.24rem;
          color: #f90;
        }
        .title{
          margin-bottom: 0.16rem;
          line-height: 0.24rem;
          font-size: 0.24rem;
          color: #07111b;
        }
        .rank{
          line-height: 0.2rem;
          font-size: 0.24rem;
          color: #93999f;
        }
      }
      .overview-right{
        float: left;
        width: calc(100% - 3.98rem);
        padding:0.12rem 0 0.12rem 0.18rem;
        .score-wrapper{
          line-height: 0.36rem;
          margin-top: 0.16rem;
          text-align: left;
          .title{
            display: inline-block;
            vertical-align: top;
            line-height: 0.36rem;
            font-size: 0.24rem;
            color: #07111b;
          }
          .score{
            display: inline-block;
            vertical-align: top;
            line-height: 0.36rem;
            font-size: 0.24rem;
            color: #f90;
          }
          .star1{
            margin: 0 0.12rem;
          }
        }
        .delivery-wrapper{
          text-align: left;
          margin-top:0.16rem;
          .title{
            display: inline-block;
            vertical-align: top;
            line-height: 0.36rem;
            font-size: 0.24rem;
            color: #07111b;
          }
          .delivery{
            display: inline-block;
            margin-left: 0.12rem;
            vertical-align: top;
            line-height: 0.36rem;
            font-size: 0.24rem;
            color: #93999f;
          }
        }
      }
    }
    .ratingselect{
      text-align: left;
    }
    .rating-wrapper{
      padding:0 0.36rem;
      
      .rating-item{
        position: relative;
        padding: 0.36rem 0;
        display: flex;
        border-bottom: 1px solid rgba(7,17,27,.1);
        .avatar{
          width: 0.56rem;
          margin-right: 0.24rem;
          img{
            border-radius: 50%;
          }
        }
        .content{
          flex:1;
          text-align: left;
          .name{
            
            margin-bottom: 0.08rem;
            line-height: 0.24rem;
            font-weight: 700;
            font-size: 0.2rem;
            color: #07111b;
          }
          .star-wrapper{
            margin-bottom: 0.12rem;
            
          }
          .text{
              line-height: 0.36rem;
              color: #07111b;
              font-size: 0.24rem;
              margin-bottom: 0.16rem;
            }
          .recommend{
            line-height: 0.32rem;
            .icon{
              color: #00a0dc;
            }
            .item{
              display: inline-block;
              padding: 0 0.12rem;
              border:1px solid rgba(7,17,27,.1);
              border-radius: 1px;
              color: #93999f;
              background-color: #fff;
              margin:0 0.16rem 0.08rem 0;
              font-size: 0.18rem;
            }
          }
          .time{
            position: absolute;
            top: 0.35rem;
            right: 0;
            line-height: 0.24rem;
            font-size: 0.2rem;
            color: #93999f;
          }
        }
      }
    }
  }
</style>
