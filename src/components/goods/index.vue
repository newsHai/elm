<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul ref="menuList">
        <li class="menu-item" v-for="(item, index) in goods" :class="{'current':currentIndex === index}">
          <span class="text">
            <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li class="foot-list food-list-hook" v-for="item in goods">
          <h3 class="title">{{item.name}}</h3>
          <ul>
            <li class="food-item" v-for="con in item.foods"  @click="chooseFood(con, $event)">
              <div class="Img">
                <img :src="con.image" alt="">
              </div>
              <div class="content">
                <h4 class="name">{{con.name}}</h4>
                <p class="desc">{{con.description}}</p>
                <div class="extra">
                  <span class="count">月售{{con.sellCount}}</span>
                  <span class="count">好评{{con.rating}}</span>
                </div>
                <div class="price">
                  <span class="now">￥{{con.price}}</span>
                  <span class="old" v-show="con.oldPrice !== ''">￥{{con.oldPrice}}</span>
                </div>
                <div class="cartControl-wrapper">
                  <cart :con="con" @increment="incrementTotal"></cart>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div>
      <food :food="selectedFood" ref="food"></food>
      <shopCart :select-foods="selectFoods" :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice" ref="shopCart"></shopCart>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import data from '@/common/json/data.json'
import BScroll from 'better-scroll'
import cart from '@/components/cartControl'
import shopCart from '@/components/shopcart'
import food from '@/components/food'
export default {
  data(){
    return {
      goods: [],
      listHeight: [],
      selectedFood: []
    }
  },
  props:{
    seller:{
      type:Object
    }
  },
  created(){
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    this.goods = data.goods;
    this.$nextTick(() => {
      this._initScroll();
    })
    
  },
  methods:{
    _initScroll(){
      this.menuScroll = new BScroll(this.$refs.menuWrapper,{
        click:true
      });
      this.foodWrapperScroll = new BScroll(this.$refs.foodWrapper,{
        click:true,
        probeType:3
      })
    },
    chooseFood(con, event){
      if(!event._constructed){
        return;
      }
      this.selectedFood = con;
      this.$refs.food.show();
    },
    incrementTotal(target){
      this.$refs.shopCart.drop(target);
      // console.log(target)
    }
  },
  computed:{
     currentIndex(){
       return 1;
     },
     selectFoods(){
      let foods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if(food.count){
            foods.push(food);
          }
        })
      })
      return foods;
    }
  },
  components:{
    cart,
    shopCart,
    food
  }
}
</script>

<style lang="less">
  .goods{
    position: absolute;
    width: 100%;
    display: flex;
    top: 174px;
    bottom: 46px;
    overflow: hidden;
    .menu-wrapper{
      width: 1.6rem;
      background-color: #f3f5f7;
      ul{
        .menu-item{
          display: table;
          height: 1.08rem;
          line-height: 0.28rem;
          padding: 0 0.2rem;
          border-bottom: 1px solid #DADDE0;
          text-align: center;

          &.current{
            position: relative;
            z-index: 10;
            margin-top: -1px;
            background-color: #fff;
            font-weight: 700;
          }
          .text{
            display: table-cell;
            width: 100%;
            vertical-align: middle;
            position: relative;
            font-size: 0.24rem;
            text-align: left;
            .icon{
              display: inline-block;
              width: 0.24rem;
              height: 0.24rem;
              vertical-align: top;
              margin-right: 0.08rem;
              background-size: 100% 100%;
              &.decrease{
              background-image:url(./images/decrease_3@2x.png)
              }
              &.discount{
                background-image:url(./images/discount_3@2x.png)
              }
              &.special{
                background-image:url(./images/special_3@2x.png)
              }
              &.invoice{
                background-image:url(./images/invoice_3@2x.png)
              }
              &.guarantee{
                background-image:url(./images/guarantee_3@2x.png)
              }
            }
          }
        }
      }
    }
    .foods-wrapper{
      flex: 1;
      ul{
        li.foot-list{
         
          .title{
            padding-left: 0.28rem;
            height: 0.52rem;
            line-height: 0.52rem;
            border-left: 2px solid #d9dde1;
            font-size: 0.24rem;
            color: #93999f;
            background-color: #f3f5f7;
            text-align: left;
          }
          ul{
            .food-item{
              position: relative;
              display: flex;
              margin: 0.36rem;
              padding-bottom: 0.36rem;
              border-bottom: 1px solid #E5E6E7;
              &:last-child{
                border:none 0;
                margin-bottom: 0;
              }
              .Img{
                flex: 0 0 0.57rem;
                margin-right: 0.2rem;
                img{
                  width:1.14rem;
                  height: 1.14rem;
                }
              }
              .content{
                flex: 1;
                text-align: left;
                position: relative;
                .name{
                  margin:0.04rem 0 0.16rem;
                  font-size: 0.28rem;
                  line-height: 0.28rem;
                  color: #07111b;
                }
                .desc{
                  margin-bottom: 0.16rem;
                  line-height: 0.24rem;
                  color: #93999f;
                }
                .extra{
                  font-size: 0.2rem;
                  line-height: 0.2rem;
                  .count{
                    margin-right: 0.24rem;
                    color: #93999f;
                  }
                }
                .price{
                  line-height: 0.48rem;
                  .now{
                    margin-right: 0.16rem;
                    font-size: 0.28rem;
                    color:#f01414;
                  }
                  .old{
                    font-size: 0.2rem;
                    color:#93999f;
                    text-decoration: line-through;
                  }
                }
                .cartControl-wrapper{
                  position: absolute;
                  right: 0;
                  bottom: -0.1rem;
                  z-index:10;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
