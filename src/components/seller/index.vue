<template>
  <div class="seller">
    <div class="seller_top">
      <header>
        <h2>
          {{seller.name}}
        </h2>
        <div class="desc">
          <star :size="36" :score="seller.score"></star>
          <span>({{seller.ratingCount}})</span>
          <span>月售{{seller.sellCount}}单</span>
        </div>
      </header>
      <ul class="remark">
        <li>
          <h3>起步价</h3>
          <p class="content">
            <span>{{seller.minPrice}}</span>
            元
          </p>
        </li>
        <li>
          <h3>商家配送</h3>
          <p class="content">
            <span>{{seller.deliveryPrice}}</span>
            元
          </p>
        </li>
        <li>
          平均配送时间
          <p class="content">
            <span>{{seller.deliveryTime}}</span>
            元
          </p>
        </li>
      </ul>
      <div class="favorite" @click="toggleFavorite">
        <i class="icon iconfont icon-xiai" :class="{'active':isOk}"></i>
        <span>{{favoriteText}}</span>
      </div>
    </div>
    <div class="split"></div> 
    <div class="bulletin">
      <h3 class="title">公告与活动</h3>
      <p class="content">{{seller.bulletin}}</p>
      <ul class="supports">
        <li class="support-item" v-for="(item,index) in seller.supports">
          <span class="icon" :class="classMap[item.type]"></span>
          <span class="text">{{item.description}}</span>
        </li>
      </ul>
    </div>
    <div class="split"></div> 
    <div class="pics">
      <h3 class="title">商家实景</h3>
      <div class="pic-wrapper" ref="picWrapper">
        <ul class="pic-list" ref="picList">
          <li class="pic-item" v-for="pic in seller.pics">
            <img :src="pic" alt="">
          </li>
        </ul>
      </div>
    </div>
    <div class="split"></div> 
    <div class="infos">
      <h3 class="title">商家信息</h3>
      <ul>
        <li class="info-item" v-for="item in seller.infos">
          {{item}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import star from '@/components/star';
import BScroll from 'better-scroll';
const options = {
  scrollY:false
}
export default {
  data(){
    return {
      isOk:false,
      favorite:'',
      
    }
  },
  props:{
    seller:{
      type:Object
    }
  },
  computed: {
    favoriteText(){
      return this.isOk ? '已收藏' : '收藏'
    }
  },
  methods:{
    toggleFavorite(){
      this.isOk = !this.isOk;
    },
    loadData(){
      this.$nextTick(() => {
        let picWidth = 90;
        let margin = 6;
        let width = (picWidth + margin) * this.seller.pics.length - margin;
        this.$refs.picList.style.width = width + 'px';
        this.scroll = new BScroll(this.$refs.picWrapper,{
          scrollX:true,
          eventPassthrough:'vertical'
        })
      })
    }
  },
  created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.loadData();
  },
  components:{
    star
  }
}
</script>

<style lang="less">
  .seller_top{
    padding:0.36rem;
    position: relative;
    header{
      text-align: left;
      border-bottom:1px solid #F2F2F3;
      padding-bottom: 0.36rem;
      h2{
        margin-bottom: 0.16rem;
        line-height: 0.28rem;
        color: #07111b;
        font-size: 0.28rem;
      }
    }
    .remark{
      display: flex;
      margin-top:18px;
      li{
        flex: 1;
        border-right: 1px solid #F2F2F3;
        h3{
          margin-bottom: 0.08rem;
          line-height: 0.2rem;
          font-size: 0.2rem;
          color:#939995;
        }
        .content{
          line-height: 0.48rem;
          font-size: 0.2rem;
          color:#07111b;
          span{
            font-size: 0.48rem;
          }
        }
        &:last-child{
          border: none 0;
        }
      }
    }
    .favorite{
      position: absolute;
      right: 0.3rem;
      top:0.25rem;
      .icon{
        display: block;
        width: 1rem;
        line-height: 0.48rem;
        font-size: 0.48rem;
        &.active{
          color:#f00;
        }
      }
    }
  }
  .bulletin{
    padding: 0.36rem 0.36rem 0 0.36rem;
    .title{
      margin-bottom: 0.16rem;
      line-height: 0.28rem;
      color: #07111b;
      font-size: 0.28rem;
      text-align: left;
    }
    .content{
      padding: 0 0.24rem 0.32rem 1px;
      line-height: 0.48rem;
      font-size: 0.32rem;
      text-align: left;
    }
    .supports{
      li{
        padding:0.32rem 0.24rem;
        border-top: 1px solid #f2f2f3;
        text-align: left;
        span{
          display: inline-block;
          &.icon{
            width: 0.32rem;
            height: 0.32rem;
            vertical-align: top;
            margin-right: 0.12rem;
            background-size: 100% 100%;
            &.decrease{
              background-image:url(./images/decrease_4@2x.png)
            }
            &.discount{
              background-image:url(./images/discount_4@2x.png)
            }
            &.special{
              background-image:url(./images/special_4@2x.png)
            }
            &.invoice{
              background-image:url(./images/invoice_4@2x.png)
            }
            &.guarantee{
              background-image:url(./images/guarantee_4@2x.png)
            }
          }
          &.text{
            font-size: 0.24rem;
            line-height: 0.32rem;
            color: #07111b;
          }
        }
      }
    }
  }
  .pics{
    padding: 0.36rem;
    .title{
      margin-bottom: 0.24rem;
      line-height: 0.28rem;
      color:#07111b;
      font-size: 0.28rem;
      text-align: left;
    }
    .pic-wrapper{
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      .pic-list{
        .pic-item{
          display: inline-block;
          margin-right: 0.12rem;
          width: 1.8rem;
          height: 1.8rem;
          img{
            width: 100%;
            height: 100%;
          }
          &:last-child{
             margin:0;
          }
        }
      }
    }
  }
  .infos{
    padding: 0.36rem 0.36rem 0;
    .title{
      margin-bottom: 0.24rem;
      line-height: 0.28rem;
      color:#07111b;
      font-size: 0.28rem;
      text-align: left;
    }
    ul{
      .info-item{
        padding: 0.32rem 0.24rem;
        line-height: 0.32rem;
        font-size: 0.24rem;
        text-align: left;
        border-top: 1px solid #f2f2f3;
      }
    }
  }
</style>
