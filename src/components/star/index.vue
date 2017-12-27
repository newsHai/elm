<template>
  <div class="star">
      <div class="star-item" :class="starType">
          <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
      </div>
  </div>
</template>

<script>
const length = 5;
const cls_on = 'on';
const cls_half = 'half';
const cls_off = 'off';
export default {
    props:{
        size:{
            type:Number
        },
        score:{
            type:Number
        }
    },
    computed: {
        starType(){
            return 'star-' + this.size;
        },
        itemClasses(){
            const length = 5;
            // 判断是否大于它的一半
            const result = [];
            let a = Math.floor(this.score);
            let b = a + 0.5;
            for(let i = 0; i < a; i++){
                result.push(cls_on);
            }
            this.score < a ? result.push(cls_off) : result.push(cls_half);
            while(result.length < length){
                result.push(cls_off);
            }
            return result;
        }
    }
}
</script>

<style lang="less">
    .star{
        display: inline-block;
       .star-item{
           display: inline-block;
           &.star-48{
               .star-item{
                   width: 0.4rem;
                   height: 0.4rem;
                   margin-right: 0.44rem;
                   background-size: 100% 100%;
                   &.last{
                       margin-right: 0;
                   }
                   &.on{ 
                       background-image:url(./images/star48_on@2x.png)
                   }
                   &.half{
                       background-image:url(./images/star48_half@2x.png)                       
                   }
                   &.off{
                       background-image:url(./images/star48_off@2x.png)                       
                   }
               }
           }
           &.star-36{
               .star-item{
                   width: 0.3rem;
                   height: 0.3rem;
                   margin-right: 0.06rem;
                   background-size: 100% 100%;
                   &.last{
                       margin-right: 0;
                   }
                   &.on{
                       background-image:url(./images/star36_on@2x.png)
                   }
                   &.half{
                       background-image:url(./images/star36_half@2x.png)                       
                   }
                   &.off{
                       background-image:url(./images/star36_off@2x.png)                       
                   }
               }
           }
           &.star-24{
               .star-item{
                   width: 0.2rem;
                   height: 0.2rem;
                   margin-right: 0.06rem;
                   background-size: 100% 100%;
                   &.last{
                       margin-right: 0;
                   }
                   &.on{
                       background-image:url(./images/star48_on@2x.png)
                   }
                   &.half{
                       background-image:url(./images/star48_half@2x.png)                       
                   }
                   &.off{
                       background-image:url(./images/star48_off@2x.png)                       
                   }
               }
           }
       } 
    }
</style>
