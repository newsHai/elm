<template>
  <div class="ratingselect">
      <div class="rating-type border-1px">
            <span class="block positive active" @click="select(2,$event)">
                全部
                <span class="count">{{ratings.length}}</span>
            </span>
            <span class="block positive" @click="select(0,$event)">
                推荐
                <span class="count">{{positives.length}}</span>
            </span>
            <span class="block negative" @click="select(1,$event)">
                吐槽
                <span class="count">{{negatives.length}}</span>
            </span>
        </div>
        <div class="switch" :class="{'on':onlyContent}" @click="changeSelect($event)">
            <i class="icon iconfont icon-gou"></i>
            <span>只看有内容的评价</span>
        </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            onlyContent:true
        }
    },
    props:{
        ratings:{
            type:Array
        }
    },
    methods:{
        select(type,event){
            if(!event._constructed){
                return
            }
            this.selectType = type;
            this.$emit('increment', 'selectType', type)
        },
        changeSelect(event){
            if(!event._constructed){
                return
            }
            this.onlyContent = !this.onlyContent;
            this.$emit('increment','onlyContent', this.onlyContent)
        }
    },
    computed: {
        positives(){
           let positives = this.ratings.filter((rating) => {
               return rating.rateType === 0
            })
           return positives;
        },
        negatives(){
            let negatives = this.ratings.filter((rating) => {
               return rating.rateType === 1
            })
            return negatives;
        }
    }
}
</script>

<style lang="less">
.rating-type{
    padding: 0.36rem 0;
    margin: 0 0.36rem;
    position: relative;
    .block{
        display: inline-block;
        padding: 0.16rem 0.24rem;
        margin-right: 0.16rem;
        border-radius: 3px;
        font-size: 0.24rem;
        color: #4d555d;
        &.positive{
            background-color: rgba(0,160,220,.2);
            &.active{
                color: #fff;
                background-color: #00a0dc;
            }
        }
        &.negative{
            background-color: rgba(77,85,93,.2);
        }
    }
}
.switch{
    padding: 0.24rem 0.36rem;
    line-height: 0.48rem;
    color: #93999f;
    border-top: 1px solid rgba(1,17,27,.1);
    border-bottom: 1px solid rgba(1,17,27,.1);
    font-size: 0.24rem;
    .icon-gou{
        font-size: 0.48rem;
        color:#93999f;
        vertical-align: middle;
    }
    &.on{
        .icon-gou{
            color:#00c850;
        }
    }
}
</style>
